// @ts-nocheck
'use client';

import { useCallback, useEffect, useRef } from 'react';

import './ScrollExpand.css';

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

const smoothstep = (edge0, edge1, x) => {

  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);

  return t * t * (3 - 2 * t);

};

export interface ScrollExpandProps {
  src?: string;
  mediaType?: 'image' | 'video';
  poster?: string;
  alt?: string;
  title?: string;
  scrollHint?: string;
  startWidth?: number;
  startHeight?: number;
  startRadius?: number;
  endRadius?: number;
  mediaZoom?: number;
  scrollDistance?: number;
  holdDistance?: number;
  smoothing?: number;
  overlayScrim?: number;
  useWindowScroll?: boolean;
  enabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

const ScrollExpand: React.FC<ScrollExpandProps> = ({

  src = '',

  mediaType = 'image',

  poster = '',

  alt = '',

  title = '',

  scrollHint = '',

  startWidth = 42,

  startHeight = 58,

  startRadius = 24,

  endRadius = 0,

  mediaZoom = 1.35,

  scrollDistance = 1.2,

  holdDistance = 0.35,

  smoothing = 0.1,

  overlayScrim = 0.45,

  useWindowScroll = false,

  enabled = true,

  children,

  className = '',

  style,

  ...rest

}) => {

  const rootRef = useRef(null);

  const trackRef = useRef(null);

  const stageRef = useRef(null);

  const frameRef = useRef(null);

  const mediaRef = useRef(null);

  const titleRef = useRef(null);

  const overlayRef = useRef(null);

  const scrimRef = useRef(null);

  const hintRef = useRef(null);

  const propsRef = useRef({});

  propsRef.current = {

    startWidth,

    startHeight,

    startRadius,

    endRadius,

    mediaZoom,

    scrollDistance,

    holdDistance,

    smoothing,

    overlayScrim,

    useWindowScroll,

    enabled

  };

  const applyProgress = useCallback(p => {

    const frame = frameRef.current;

    const media = mediaRef.current;

    if (!frame || !media) return;

    const c = propsRef.current;

    const e = smoothstep(0, 1, p);

    const w = c.startWidth + (100 - c.startWidth) * e;

    const h = c.startHeight + (100 - c.startHeight) * e;

    const ix = Math.max(0, (100 - w) / 2);

    const iy = Math.max(0, (100 - h) / 2);

    const r = c.startRadius + (c.endRadius - c.startRadius) * e;

    frame.style.clipPath = `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${r}px)`;

    media.style.transform = `scale(${1 + ((c.mediaZoom || 1.1) - 1) * e})`;

    // 3-Phase Scroll Sequence:
    // 1. Initial view (p < 0.18): Pure photo, NO text, NO scrim ("it should be fully picture and that no text should show")
    // 2. Middle phase (0.18 <= p <= 0.65): Text & scrim reveal ("then after 2 small scrolls, the text shows")
    // 3. Final phase (p > 0.65): Text & scrim smoothly fade back out ("and THEN when scroll gain the picture shohws fully")
    let textOpacity = 0;
    if (p < 0.18) {
      textOpacity = 0;
    } else if (p < 0.38) {
      textOpacity = smoothstep(0.18, 0.38, p);
    } else if (p <= 0.62) {
      textOpacity = 1;
    } else if (p < 0.82) {
      textOpacity = 1 - smoothstep(0.62, 0.82, p);
    } else {
      textOpacity = 0;
    }

    if (scrimRef.current) {
      scrimRef.current.style.opacity = `${(c.overlayScrim || 0.6) * textOpacity}`;
    }

    if (titleRef.current) {

      const out = smoothstep(0.4, 0.88, p);

      titleRef.current.style.opacity = `${1 - out}`;

      titleRef.current.style.transform = `translate3d(0, ${-28 * out}px, 0) scale(${1 + 0.06 * out})`;

    }

    if (hintRef.current) {

      const gone = smoothstep(0, 0.12, p);

      hintRef.current.style.opacity = `${1 - gone}`;

      hintRef.current.style.transform = `translate3d(0, ${8 * gone}px, 0)`;

    }

    if (overlayRef.current) {
      overlayRef.current.style.opacity = `${textOpacity}`;
      let translateY = 0;
      if (p < 0.40) {
        translateY = 20 * (1 - textOpacity);
      } else if (p > 0.60) {
        translateY = -20 * (1 - textOpacity);
      }
      overlayRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`;
      overlayRef.current.style.pointerEvents = textOpacity > 0.15 ? 'auto' : 'none';
    }

  }, []);

  useEffect(() => {

    const root = rootRef.current;

    const track = trackRef.current;

    const stage = stageRef.current;

    if (!root || !track || !stage) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;

    let current = 0;

    let target = 0;

    let stageH = 0;

    let running = false;

    const measure = () => {
      const c = propsRef.current;
      stageH = root.clientHeight || (c.useWindowScroll ? 540 : root.clientHeight);
      if (stageH <= 0) return;
      stage.style.height = '100%';
      track.style.height = '100%';
      const w = root.clientWidth || stageH;
      stage.style.setProperty('--se-title-size', `${clamp(w * 0.075, 20, 84)}px`);
    };

    const readProgress = () => {
      const c = propsRef.current;
      if (!c.enabled) return 1;

      if (c.useWindowScroll) {
        const el = rootRef.current || trackRef.current;
        if (!el) return 0;

        // Check if there is a parent scroll-pin container (e.g. [data-scroll-pin])
        const pinContainer = el.closest('[data-scroll-pin]');
        if (pinContainer) {
          const rect = pinContainer.getBoundingClientRect();
          const pinTop = 80; // Pins right below the floating navbar
          const totalDistance = pinContainer.offsetHeight - window.innerHeight;
          if (totalDistance > 0) {
            const p = (pinTop - rect.top) / totalDistance;
            return clamp(p, 0, 1);
          }
        }

        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 800;
        const start = vh * 0.75;
        const end = -el.offsetHeight * 0.35;
        const p = (start - rect.top) / (start - end);
        return clamp(p, 0, 1);
      }

      const span = stageH * Math.max(0.01, c.scrollDistance);
      return clamp(root.scrollTop / span, 0, 1);
    };

    const tick = () => {

      const c = propsRef.current;

      const k = c.smoothing <= 0 ? 1 : 1 - Math.exp(-1 / (60 * c.smoothing));

      current += (target - current) * k;

      if (Math.abs(target - current) < 0.0004) {

        current = target;

        running = false;

      }

      applyProgress(current);

      raf = running ? requestAnimationFrame(tick) : 0;

    };

    const kick = () => {

      if (running) return;

      running = true;

      if (!raf) raf = requestAnimationFrame(tick);

    };

    let scrollTicking = false;
    const onScroll = () => {
      if (scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(() => {
        target = readProgress();
        current = target;
        applyProgress(current);
        scrollTicking = false;
      });
    };

    const onResize = () => {

      measure();

      target = readProgress();

      current = target;

      applyProgress(current);

    };

    measure();

    target = readProgress();

    current = target;

    applyProgress(current);

    const scroller = useWindowScroll ? window : root;

    scroller.addEventListener('scroll', onScroll, { passive: true });

    window.addEventListener('resize', onResize);

    const ro = new ResizeObserver(onResize);

    ro.observe(root);

    return () => {

      if (raf) cancelAnimationFrame(raf);

      scroller.removeEventListener('scroll', onScroll);

      window.removeEventListener('resize', onResize);

      ro.disconnect();

    };

  }, [applyProgress, useWindowScroll]);

  const media =

    mediaType === 'video' ? (

      <video

        ref={mediaRef}

        className="scroll-expand__media"

        src={src}

        poster={poster}

        autoPlay

        muted

        loop

        playsInline

      />

    ) : (

      <img ref={mediaRef} className="scroll-expand__media" src={src} alt={alt} draggable={false} />

    );

  return (

    <div

      ref={rootRef}

      className={`scroll-expand ${useWindowScroll ? '' : 'scroll-expand--scroller'} ${className}`.trim()}

      style={style}

      {...rest}

    >

      <div ref={trackRef} className="scroll-expand__track">

        <div ref={stageRef} className="scroll-expand__stage">

          <div ref={frameRef} className="scroll-expand__frame">

            {media}

            <div ref={scrimRef} className="scroll-expand__scrim" />

            {children ? (

              <div ref={overlayRef} className="scroll-expand__overlay">

                {children}

              </div>

            ) : null}

          </div>

          {title ? (

            <div ref={titleRef} className="scroll-expand__title">

              {title}

            </div>

          ) : null}

          {scrollHint ? (

            <div ref={hintRef} className="scroll-expand__hint">

              {scrollHint}

            </div>

          ) : null}

        </div>

      </div>

    </div>

  );

};

export default ScrollExpand;