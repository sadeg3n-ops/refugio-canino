import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Heart, HandHeart, PawPrint, Home, 
  Gift, Coffee, ArrowRight, Activity, Bone, Award, Shield,
  Users, Compass, ChevronLeft, ChevronRight,
  Instagram, Facebook, Twitter, MapPin, Mail, Phone,
  Calendar, CheckCircle2, Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from './components/ui/button';
import { Slider } from './components/ui/slider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './components/ui/dialog';
import { cn } from '@/lib/utils';
import heroCover from './assets/hero-cover.png';
import heroCoverMobile from './assets/hero-cover-mobile.jpg';

/**
 * UTILITIES
 */
const fireConfetti = () => {
  const duration = 2 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };
  const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

  const interval: any = setInterval(function() {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }
    const particleCount = 50 * (timeLeft / duration);
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
  }, 250);
}

/**
 * ANIMATION VARIANTS
 */
const fadeUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

/**
 * COMPONENTS
 */

const AnimatedBackground = () => {
  return (
    <>
      <div className="noise-bg pointer-events-none hidden sm:block" />
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden opacity-30 hidden sm:block">
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 text-orange-200"
        >
          <PawPrint size={120} />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/4 right-20 text-orange-100"
        >
          <Heart size={80} />
        </motion.div>
        <motion.div 
          animate={{ y: [0, -40, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/3 left-1/4 text-[#E2725B]/20"
        >
          <Bone size={150} />
        </motion.div>
        
        {/* Soft gradientes Terracota / Melocotón */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#E2725B] blur-[150px] opacity-[0.15]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#FFB347] blur-[150px] opacity-[0.1]" />
      </div>
    </>
  );
};

const Header = () => (
  <header className="sticky top-0 z-50 w-full bg-[#fafaf9]/80 backdrop-blur-xl border-b border-stone-200/50 shadow-sm transition-all duration-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      <div className="flex items-center gap-3 relative group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <motion.div 
          whileHover={{ rotate: 15, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="w-12 h-12 bg-gradient-to-br from-[#E2725B] to-[#FF8C6B] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] flex items-center justify-center shadow-md relative overflow-hidden"
        >
          <PawPrint className="text-white relative z-10" size={24} />
          {/* subtle shine effect */}
          <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </motion.div>
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-800 tracking-tight">Alma Canina</h1>
          <p className="text-[10px] sm:text-xs text-[#E2725B] font-semibold tracking-wide uppercase">Refugio de Esperanza</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          onClick={() => document.getElementById('decision-bridge')?.scrollIntoView({ behavior: 'smooth' })}
          className="hidden md:flex text-orange-600 hover:bg-orange-50 hover:text-orange-700 font-semibold rounded-full px-6 transition-all"
        >
          <Heart size={16} className="mr-2 fill-current" />
          Hazte Socio
        </Button>
      </div>
    </div>
  </header>
);

const LoveWall = () => {
   const messages = [
      "¡Mucha fuerza Toby, ya llega tu familia!",
      "Gracias por salvar a Max ❤️",
      "Cada euro cuenta, ¡ánimo equipo!",
      "Ayer adopté a Luna y me ha cambiado la vida.",
      "Ojalá pudiera llevarlos a todos a casa.",
      "Maravillosa labor la que hacéis. ¡Adelante!",
      "Mi donación es por mi perro Golfo, que cruzó el arcoíris.",
      "Si todos ayudamos un poco, el mundo sería perfecto para ellos."
   ];

   return (
      <div className="w-full bg-[#E2725B] text-white py-3 overflow-hidden border-y border-[#d1614b]">
         <div className="flex relative">
            <div className="animate-marquee whitespace-nowrap flex items-center gap-8 px-4 cursor-default">
               {[...messages, ...messages].map((msg, idx) => (
                  <span key={idx} className="flex items-center gap-2 font-medium tracking-wide">
                     <Heart size={14} className="fill-current text-[#FFB347] opacity-80" /> 
                     {msg}
                  </span>
               ))}
            </div>
         </div>
      </div>
   )
}

const Hero = () => {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], ['0%', '12%']);
  const opacity = useTransform(scrollY, [150, 600], [1, 0]);

  return (
    <section className="relative isolate w-full h-[74vh] min-h-[460px] sm:h-[78vh] sm:min-h-[520px] max-h-[900px] flex items-stretch overflow-hidden bg-stone-900">
      {/* Imagen en <img>: más fiable que background + transform en algunos navegadores */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={heroCover}
          srcSet={`${heroCoverMobile} 900w, ${heroCover} 1200w`}
          sizes="(max-width: 640px) 100vw, 1200px"
          alt=""
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full min-h-full min-w-full object-cover object-[130%_center] sm:object-right"
          onError={(e) => {
            const el = e.currentTarget;
            if (!el.src.endsWith('/hero-cover.png')) el.src = '/hero-cover.png';
          }}
        />
      </motion.div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-stone-950/90 via-stone-900/65 via-45% to-transparent sm:via-50%" />
      <div className="absolute inset-0 z-[1] bg-black/30 sm:bg-black/24" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#fafaf9]/12 via-transparent to-stone-950/25" />

      <motion.div 
        style={{ opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start text-left h-full pt-16 pb-10 sm:pt-20 sm:pb-12 md:pr-[min(46%,28rem)] lg:pr-[min(52%,32rem)]"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <motion.div
            className="inline-flex items-center gap-2.5 rounded-full border border-white/30 bg-white/12 px-5 py-2.5 text-sm text-white backdrop-blur-md"
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(226,114,91,0), 0 0 20px rgba(226,114,91,0.12)',
                '0 0 0 1px rgba(255,179,71,0.2), 0 0 28px rgba(226,114,91,0.35)',
                '0 0 0 0 rgba(226,114,91,0), 0 0 20px rgba(226,114,91,0.12)',
              ],
            }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="relative flex h-3 w-3 shrink-0 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFB347] opacity-50" />
              <motion.span
                className="relative h-2.5 w-2.5 rounded-full bg-[#FFB347] shadow-[0_0_10px_rgba(255,179,71,0.9)]"
                animate={{ scale: [1, 1.15, 1], opacity: [1, 0.92, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            </span>
            <span className="font-medium tracking-wide [text-shadow:0_1px_12px_rgba(0,0,0,0.35)]">
              3 urgencias críticas hoy
            </span>
          </motion.div>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.06] mb-5 sm:mb-6 tracking-tight max-w-[14ch] sm:max-w-[16ch] lg:max-w-xl [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]"
        >
          Él es <span className="whitespace-nowrap">Toby.</span>
          <span className="block mt-1 sm:mt-2 text-[0.92em] sm:text-[0.95em] font-black text-white/95">
            Hace 2 días
          </span>
          <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#FFB347] to-[#E2725B] [text-shadow:none] drop-shadow-[0_2px_16px_rgba(0,0,0,0.25)]">
            no tenía nombre.
          </span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl text-stone-100/95 leading-relaxed max-w-md sm:max-w-lg mb-8 sm:mb-10 font-medium text-inter [text-shadow:0_1px_14px_rgba(0,0,0,0.35)]"
        >
          Hoy busca un futuro. Como Toby, cientos aguardan una segunda oportunidad. No hace falta adoptarlo para salvarlo: un solo gesto lo cambia todo.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5, type: "spring", stiffness: 200 }}
          className="w-full max-w-md"
        >
          <Button
            size="lg"
            onClick={() => {
              document.getElementById('decision-bridge')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative w-full sm:w-auto bg-[#E2725B] hover:bg-[#d1614b] text-white font-bold rounded-full px-8 sm:px-12 py-7 sm:py-8 text-lg sm:text-xl md:text-2xl transition-all duration-300 shadow-[0_15px_40px_-10px_rgba(226,114,91,0.55)] hover:shadow-[0_20px_50px_-5px_rgba(226,114,91,0.65)] flex items-center justify-center overflow-hidden"
          >
             <motion.span 
               whileHover={{ x: 5 }} 
               transition={{ type: "spring", stiffness: 300, damping: 10 }}
               className="flex items-center gap-3 relative z-10 text-center sm:text-left"
            >
               Quiero ser su mundo entero
               <Heart className="group-hover:fill-current transition-all shrink-0" />
            </motion.span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full duration-1000 transition-transform" />
          </Button>
          <p className="mt-4 text-sm text-stone-200/90 font-medium [text-shadow:0_1px_8px_rgba(0,0,0,0.3)]">Solo te llevará 2 minutos descubrir cómo ayudar.</p>
        </motion.div>
      </motion.div>
    </section>
  );
};

const VOLUNTEER_WEEKDAYS = [
  { id: 1, short: 'Lun', full: 'Lunes' },
  { id: 2, short: 'Mar', full: 'Martes' },
  { id: 3, short: 'Mié', full: 'Miércoles' },
  { id: 4, short: 'Jue', full: 'Jueves' },
  { id: 5, short: 'Vie', full: 'Viernes' },
  { id: 6, short: 'Sáb', full: 'Sábado' },
  { id: 7, short: 'Dom', full: 'Domingo' },
] as const;

const VOLUNTEER_TASKS = [
  { id: 'paseos', label: 'Paseos y ejercicio' },
  { id: 'limpieza', label: 'Limpieza de boxes y zonas comunes' },
  { id: 'comida', label: 'Comida, agua y medicación básica' },
  { id: 'compania', label: 'Compañía y socialización' },
] as const;

type VolunteerBookingDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const VolunteerBookingDialog = ({ open, onOpenChange }: VolunteerBookingDialogProps) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [tasks, setTasks] = useState<string[]>(['paseos', 'limpieza']);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) {
      setSelectedDay(null);
      setTasks(['paseos', 'limpieza']);
      setSubmitted(false);
    }
  }, [open]);

  const toggleTask = (id: string) => {
    setTasks((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));
  };

  const handleConfirm = () => {
    if (selectedDay == null) return;
    setSubmitted(true);
    confetti({
      particleCount: 55,
      spread: 62,
      origin: { y: 0.65 },
      colors: ['#E2725B', '#FFB347', '#fafaf9'],
    });
  };

  const dayLabel = selectedDay != null ? VOLUNTEER_WEEKDAYS.find((d) => d.id === selectedDay)?.full : '';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[min(88vh,620px)] max-w-[min(100%,26rem)] flex-col gap-0 overflow-hidden rounded-2xl border-stone-200 bg-[#fafaf9] p-0 shadow-2xl sm:max-w-md z-[100]">
        {!submitted ? (
          <>
            <div className="shrink-0 bg-gradient-to-br from-[#E2725B] to-[#d65a4a] px-6 pb-5 pt-6 text-white">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest">
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
                Demo de reserva
              </div>
              <DialogHeader className="space-y-1.5 text-left text-white">
                <DialogTitle className="text-2xl font-black tracking-tight text-white sm:text-[1.65rem]">
                  Elige tu día en el refugio
                </DialogTitle>
                <DialogDescription className="text-sm leading-snug text-white/85 text-inter">
                  Selecciona un día de la semana y las tareas que te encajan. En la web real esto se enviaría al equipo para confirmarte plaza.
                </DialogDescription>
              </DialogHeader>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-4">
              <div className="space-y-4">
                <div>
                  <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-stone-500">
                    <Calendar className="h-4 w-4 text-[#E2725B]" aria-hidden />
                    Día de la semana
                  </p>
                  <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                    {VOLUNTEER_WEEKDAYS.map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setSelectedDay(d.id)}
                        title={d.full}
                        className={cn(
                          'flex min-h-[2.75rem] flex-col items-center justify-center rounded-xl border px-0.5 py-1.5 text-[10px] font-bold transition-all sm:min-h-0 sm:py-2 sm:text-xs',
                          selectedDay === d.id
                            ? 'border-[#E2725B] bg-[#E2725B] text-white shadow-md shadow-[#E2725B]/25'
                            : 'border-stone-200 bg-white text-stone-600 hover:border-[#E2725B]/40 hover:bg-orange-50/80'
                        )}
                      >
                        <span className="leading-tight">{d.short}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-stone-500">¿En qué quieres ayudar?</p>
                  <div className="flex flex-col gap-1.5">
                    {VOLUNTEER_TASKS.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => toggleTask(t.id)}
                        className={cn(
                          'flex w-full items-center gap-3 rounded-xl border px-3 py-2 text-left text-sm font-medium transition-all text-inter',
                          tasks.includes(t.id)
                            ? 'border-[#E2725B]/50 bg-[#E2725B]/[0.08] text-zinc-900'
                            : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                        )}
                      >
                        <span
                          className={cn(
                            'flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 text-[10px]',
                            tasks.includes(t.id)
                              ? 'border-[#E2725B] bg-[#E2725B] text-white'
                              : 'border-stone-300 bg-white'
                          )}
                        >
                          {tasks.includes(t.id) ? '✓' : ''}
                        </span>
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="shrink-0 border-t border-stone-200/80 bg-stone-50/90 px-6 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 max-sm:pb-24">
              <p className="mb-2.5 text-center text-[10px] leading-tight text-stone-400 text-inter">
                Simulación de reserva — en producción el refugio confirmaría tu plaza.
              </p>
              <Button
                type="button"
                disabled={selectedDay == null || tasks.length === 0}
                onClick={handleConfirm}
                className="w-full rounded-xl bg-[#E2725B] py-5 text-base font-bold text-white hover:bg-[#c95440] disabled:opacity-50"
              >
                Confirmar reserva (demo)
              </Button>
            </div>
          </>
        ) : (
          <div className="px-6 py-10 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-9 w-9" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-black text-zinc-900">¡Listo, {dayLabel}!</h3>
            <p className="mt-3 text-sm leading-relaxed text-stone-600 text-inter">
              Hemos registrado tu preferencia para el <strong className="text-zinc-800">{dayLabel}</strong> con las tareas
              seleccionadas. En producción recibirías un correo o WhatsApp de confirmación del refugio.
            </p>
            <Button
              type="button"
              variant="outline"
              className="mt-8 w-full rounded-xl border-stone-200 py-5 font-bold"
              onClick={() => onOpenChange(false)}
            >
              Cerrar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

const DecisionBridge = () => {
  const [volunteerDialogOpen, setVolunteerDialogOpen] = useState(false);

  return (
    <section id="decision-bridge" className="w-full pt-8 pb-6 sm:pt-12 sm:pb-10 md:pt-16 md:pb-12 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#fafaf9]">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="max-w-6xl mx-auto relative cursor-default"
      >
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-zinc-800 mb-4 sm:mb-6 drop-shadow-sm tracking-tight">
            Descubre tu camino para  <br className="hidden sm:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E2725B] to-[#FF8C6B]">
               dejar una huella imborrable
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-stone-500 text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-inter font-medium leading-relaxed">
            Muchas personas creen que si no pueden adoptar, no pueden ayudar. Esa es nuestra mayor mentira.
          </motion.p>
        </div>

        {/* Bento Grid layout with stagger animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 auto-rows-[250px] md:auto-rows-[280px]">
          
          {/* Adopción - Large block */}
          <motion.div 
            variants={fadeUp}
            whileHover={{ y: -5, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="md:col-span-2 rounded-[2rem] sm:rounded-[2.5rem] bg-stone-100/50 backdrop-blur-md border border-stone-200 p-5 sm:p-8 md:p-10 flex flex-col md:flex-row items-center gap-5 sm:gap-8 md:gap-10 relative overflow-hidden group cursor-pointer hover:border-orange-300"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-orange-100/60 rounded-full blur-[80px] -mr-20 -mt-20 opacity-50 pointer-events-none transition-all group-hover:opacity-100" />
            <div className="w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden shrink-0 organic-blob border-4 border-white shadow-xl relative z-10">
               <img src="https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
            </div>
            <div className="flex flex-col h-full justify-center z-10 relative">
               <span className="text-[#E2725B] font-bold tracking-wider uppercase text-sm mb-3 flex items-center gap-2 font-inter"><Home size={18}/> Adopta una vida</span>
               <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-3 sm:mb-4 leading-tight">Dale el hogar que nunca tuvo.</h3>
               <p className="text-stone-600/90 text-inter mb-6 sm:mb-8 text-base sm:text-lg font-medium">Llevarte un perro a casa es salvar dos vidas: la suya y la del perrito que ocupará su lugar en el refugio.</p>
               <Button className="w-full sm:w-fit bg-zinc-900 hover:bg-zinc-800 text-white rounded-full px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-bold transition-all shadow-xl group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
                  Ver perritos en Adopción <ArrowRight size={18} className="ml-2"/>
               </Button>
            </div>
          </motion.div>

          {/* Donar - Small Block */}
          <motion.div 
            variants={fadeUp}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            onClick={() => document.getElementById('impact-calculator')?.scrollIntoView({ behavior: 'smooth' })}
            className="rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-br from-[#E2725B] to-[#FF8C6B] p-6 sm:p-10 flex flex-col relative overflow-hidden group cursor-pointer text-white shadow-xl shadow-orange-500/20"
          >
            <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-125 transition-transform duration-700 pointer-events-none">
               <Heart size={180} className="fill-current" />
            </div>
            <Gift className="text-white/90 mb-6" size={36}/>
            <h3 className="text-2xl font-bold mb-3">Haz una donación</h3>
            <p className="text-white/90 text-inter text-base mb-auto font-medium">Financia vacunas, cirugías de rescate y comida especializada de forma directa.</p>
            <div className="flex items-center gap-3 font-bold mt-8 underline decoration-white/40 underline-offset-4 group-hover:decoration-white transition-all text-lg">
               Calcula tu impacto <ArrowRight size={18}/>
            </div>
          </motion.div>

          {/* Acoger - Small Block */}
          <motion.div 
            variants={fadeUp}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="md:col-span-1 rounded-[2rem] sm:rounded-[2.5rem] bg-white border border-stone-200 p-6 sm:p-10 flex flex-col group cursor-pointer hover:border-[#E2725B] transition-colors shadow-sm"
          >
            <div className="w-14 h-14 bg-rose-100 text-rose-500 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-rose-500 group-hover:text-white transition-colors duration-300">
               <HandHeart size={28}/>
            </div>
            <h3 className="text-2xl font-bold text-zinc-900 mb-3">Sé familia temporal</h3>
            <p className="text-stone-500 text-inter text-base mb-auto font-medium">Acoge un perrito por unas semanas mientras le buscamos familia oficial. Costes 0€ para ti.</p>
            <div className="flex items-center gap-3 font-bold mt-8 text-rose-600 transition-all text-lg">
               Saber más <ArrowRight size={18}/>
            </div>
          </motion.div>

          {/* Volutariado - Large Block */}
          <motion.div 
            variants={fadeUp}
            whileHover={{ y: -5, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="md:col-span-2 rounded-[2rem] sm:rounded-[2.5rem] bg-zinc-900 text-white p-6 sm:p-10 flex flex-col md:flex-row items-center gap-6 sm:gap-10 relative overflow-hidden group cursor-pointer"
          >
             <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/545063/pexels-photo-545063.jpeg?auto=compress&cs=tinysrgb&w=800&fit=crop')] opacity-[0.15] mix-blend-luminosity group-hover:opacity-[0.25] transition-opacity duration-500" />
             <div className="flex flex-col h-full justify-center z-10 w-full md:w-2/3">
               <span className="text-[#FFB347] font-bold tracking-wider uppercase text-sm mb-3 flex items-center gap-2"><Users size={18}/> Pasa a la Acción</span>
               <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 leading-tight">Tu tiempo calienta el alma fría.</h3>
               <p className="text-stone-300 text-inter mb-6 sm:mb-8 text-base sm:text-lg font-medium">Ven un fin de semana a ayudar a pasear perros o a darle compañía visual a los recién rescatados. No requiere experiencia previa.</p>
               <Button
                  type="button"
                  onClick={() => setVolunteerDialogOpen(true)}
                  className="w-full sm:w-fit bg-white hover:bg-stone-200 text-zinc-900 rounded-full px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base transition-all font-bold shadow-xl"
                >
                  Apuntarme de voluntario <ArrowRight size={18} className="ml-2"/>
               </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <VolunteerBookingDialog open={volunteerDialogOpen} onOpenChange={setVolunteerDialogOpen} />
    </section>
  );
};

const DecisionToResidentsDivider = () => (
  <div className="relative w-full border-y border-[#E2725B]/20 bg-gradient-to-b from-[#fff5f2] via-[#faf8f6] to-[#fafaf9] py-7 md:py-9">
    <div
      className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,rgba(226,114,91,0.07)_0%,transparent_55%)]"
      aria-hidden
    />
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.45] bg-[radial-gradient(#e7cfc7_1px,transparent_1px)] [background-size:18px_18px]"
      aria-hidden
    />
    <div className="relative z-[1] mx-auto flex max-w-2xl flex-col items-center gap-4 px-4">
      <div className="flex w-full items-center gap-3 sm:gap-5">
        <div className="h-[3px] min-w-[3rem] flex-1 rounded-full bg-gradient-to-r from-transparent via-[#E2725B] to-[#E2725B]/50" />
        <div className="flex shrink-0 items-center gap-2.5 rounded-full border-2 border-[#E2725B]/35 bg-white/95 px-5 py-2.5 shadow-md shadow-[#E2725B]/15">
          <PawPrint className="h-5 w-5 text-[#E2725B]" strokeWidth={2.5} aria-hidden />
          <span className="text-sm font-extrabold tracking-wide text-[#c45a47]">Conócelos</span>
          <Heart className="h-4 w-4 fill-[#E2725B] text-[#E2725B]" aria-hidden />
        </div>
        <div className="h-[3px] min-w-[3rem] flex-1 rounded-full bg-gradient-to-l from-transparent via-[#E2725B] to-[#E2725B]/50" />
      </div>
      <p className="text-center text-[11px] font-bold uppercase tracking-[0.22em] text-stone-500">
        De la acción a las miradas que lo dicen todo
      </p>
      <div className="flex items-center gap-2" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#E2725B]/70" />
        ))}
      </div>
    </div>
  </div>
);

const ResidentsToImpactDivider = () => (
  <div className="relative w-full bg-[#fafaf9]">
    <div
      className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent via-[#E2725B]/[0.03] to-transparent"
      aria-hidden
    />
    <div
      className="h-px w-full bg-gradient-to-r from-transparent via-stone-400/35 to-transparent"
      aria-hidden
    />
    <svg
      className="relative z-[1] -mb-px block h-11 w-full text-[#1c1917] sm:h-14"
      viewBox="0 0 1200 56"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M0,56 L0,34 C200,18 400,48 600,30 C800,12 1000,44 1200,28 L1200,56 Z"
      />
    </svg>
  </div>
);

const ResidentCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [activePet, setActivePet] = useState<number | null>(null);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const residents = [
    {
       name: "Max", age: "6 años", 
       tagline: "El profesional en siestas lentas.",
       img: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop"
    },
    {
       name: "Luna", age: "1 año", 
       tagline: "Un torbellino de amor imparable.",
       img: "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop"
    },
    {
       name: "Rocky", age: "3 años", 
       tagline: "El compañero leal de montaña.",
       img: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop"
    },
    {
      name: "Kira", age: "2 meses", 
      tagline: "Espera aprender qué es un hogar.",
      img: "https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop"
   }
  ];

  return (
    <section id="residentes" className="w-full pt-8 pb-24 sm:pt-12 md:pt-14 md:pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_45%_at_50%_0%,rgba(226,114,91,0.07),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-stone-300/60 to-transparent" />

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto relative"
      >
        <motion.div variants={fadeUp} className="mb-12 md:mb-14 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E2725B]/25 bg-[#E2725B]/[0.07] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#c45a47]">
              <Compass size={14} strokeWidth={2.5} aria-hidden />
              Sus protagonistas
            </span>
            <h2 className="mt-5 text-[2rem] font-black leading-[1.08] tracking-tight text-zinc-900 sm:text-4xl md:text-5xl lg:text-[3.25rem]">
              Los que aguardan{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E2725B] via-[#FF8C6B] to-[#E2725B]">
                un milagro
              </span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-stone-600 text-inter md:text-lg">
              Cada uno tiene una historia. Desliza las tarjetas, y si estás en ordenador, deja el cursor un momento sobre la foto: les mandamos tu cariño en forma de corazón.
            </p>
            <p className="mt-2 text-sm text-stone-400 text-inter md:hidden">Desliza con el dedo para ver a más compañeros.</p>
          </div>

          <div className="flex shrink-0 items-center gap-0 self-start rounded-2xl border border-stone-200/80 bg-white p-1.5 shadow-sm lg:self-end">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Ver residente anterior"
              className="flex h-12 w-12 items-center justify-center rounded-xl text-zinc-600 transition-colors hover:bg-[#E2725B] hover:text-white"
            >
              <ChevronLeft size={22} strokeWidth={2} />
            </button>
            <div className="h-6 w-px bg-stone-200" aria-hidden />
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Ver siguiente residente"
              className="flex h-12 w-12 items-center justify-center rounded-xl text-zinc-600 transition-colors hover:bg-[#E2725B] hover:text-white"
            >
              <ChevronRight size={22} strokeWidth={2} />
            </button>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="overflow-hidden pb-2 pl-1 pr-1 pt-1 -mx-1" ref={emblaRef}>
          <div className="flex cursor-grab gap-5 active:cursor-grabbing md:gap-7">
            {residents.map((dog, idx) => (
              <div 
                key={dog.name} 
                className="min-w-0 flex-[0_0_88%] sm:flex-[0_0_46%] lg:flex-[0_0_31.5%]"
                onMouseEnter={() => setActivePet(idx)}
                onMouseLeave={() => setActivePet(null)}
              >
                <motion.article 
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-stone-200/90 bg-white shadow-[0_2px_24px_rgba(0,0,0,0.04)] ring-1 ring-stone-100 transition-shadow duration-300 hover:border-[#E2725B]/25 hover:shadow-[0_20px_50px_-12px_rgba(226,114,91,0.18)]"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100">
                    <img 
                      src={dog.img} 
                      alt={`Retrato de ${dog.name}, en espera de adopción`}
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 pt-20 text-left">
                      <p className="font-black tracking-tight text-white drop-shadow-md [text-shadow:0_2px_12px_rgba(0,0,0,0.35)] text-3xl sm:text-[1.75rem]">
                        {dog.name}
                      </p>
                      <span className="mt-2 inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                        {dog.age}
                      </span>
                    </div>

                    <AnimatePresence>
                      {activePet === idx && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.6, y: 8 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.85, y: -6 }}
                          transition={{ type: "spring", stiffness: 400, damping: 22 }}
                          className="pointer-events-none absolute left-1/2 top-[38%] z-10 -translate-x-1/2 -translate-y-1/2"
                        >
                          <Heart
                            size={56}
                            className="fill-[#FFB347] text-[#FFB347] drop-shadow-[0_8px_28px_rgba(255,179,71,0.55)]"
                            strokeWidth={1.5}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex flex-1 flex-col justify-between gap-6 p-6 sm:p-7 text-left">
                    <p className="text-[1.05rem] font-medium leading-snug text-stone-600 text-inter md:text-lg">
                      <span className="text-[#E2725B]">“</span>
                      {dog.tagline}
                      <span className="text-[#E2725B]">”</span>
                    </p>
                    <span className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-stone-200 bg-stone-50/80 py-3.5 text-sm font-bold text-zinc-800 transition-colors group-hover:border-[#E2725B]/40 group-hover:bg-[#E2725B]/[0.06] group-hover:text-[#E2725B] sm:justify-between sm:px-5">
                      Leer su historia
                      <ArrowRight size={18} className="shrink-0 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </motion.article>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const ImpactCalculator = () => {
  const [amount, setAmount] = useState(25);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const getImpact = (val: number) => {
    if (val < 10) return { text: "Cubre una cena nutritiva de bienvenida para aliviar el estrés de la primera noche.", icon: <Coffee size={34} className="text-[#FFB347]"/>};
    if (val < 25) return { text: "Financia pipeta y desparasitación completa para entrar limpio al refugio.", icon: <Shield size={34} className="text-emerald-400"/>};
    if (val < 50) return { text: "Paga el pack de vacunas anuales y chip oficial para que pueda ser adoptado.", icon: <Activity size={34} className="text-[#FF8C6B]"/>};
    if (val < 150) return { text: "Cubre una esterilización segura u operación de urgencia nivel 1.", icon: <Heart size={34} className="text-rose-400"/>};
    return { text: "Garantiza una cirugía traumatológica para un perro rescatado tras un accidente", icon: <Award size={34} className="text-yellow-400"/>};
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const impact = getImpact(amount);

  return (
    <section 
       id="impact-calculator"
       onMouseMove={handleMouseMove}
       className="w-full py-20 md:py-24 bg-[#1c1917] text-white relative overflow-hidden shadow-inner"
    >
      <div 
         className="absolute w-[800px] h-[800px] bg-gradient-radial from-[#E2725B]/20 to-transparent rounded-full pointer-events-none transition-opacity duration-300 blur-[80px]"
         style={{ transform: `translate(${mousePos.x - 400}px, ${mousePos.y - 400}px)` }}
      />
      
      <motion.div 
         initial="hidden"
         whileInView="visible"
         viewport={{ once: true, margin: "-100px" }}
         variants={staggerContainer}
         className="max-w-2xl mx-auto px-4 sm:px-6 relative z-10 text-center"
      >
        <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-[2.6rem] font-black mb-4 text-stone-50 tracking-tight leading-tight md:leading-snug">
          "¿De verdad ayuda <br className="hidden md:block"/> lo poco que tengo?"
        </motion.h2>
        <motion.p variants={fadeUp} className="text-stone-400 text-base md:text-lg mb-8 md:mb-10 text-inter max-w-xl mx-auto font-medium leading-relaxed">
          Mueve el deslizador y descubre cómo transformamos recursos financieros en latidos de corazón. La magia ocurre instante.
        </motion.p>

        <motion.div variants={fadeUp} className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl relative">
          
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-1 tracking-tighter drop-shadow-lg tabular-nums">
            {amount}€<span className="text-lg md:text-xl text-stone-400 font-bold">/mes</span>
          </h3>
          <p className="text-xs sm:text-sm font-medium text-stone-500 mb-6 text-inter">Arrastra el corazón o pulsa la barra para ajustar tu aportación</p>

          <div className="mb-6 space-y-2">
            <div className="flex items-center justify-between gap-3 px-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-500 sm:text-[11px]">
              <span>Aportación mensual</span>
              <span className="text-stone-400 normal-case tracking-normal">2€ — 250€</span>
            </div>
            <div className="relative px-0.5 pb-1 pt-0.5">
              <div
                className="pointer-events-none absolute left-2 right-2 top-[calc(50%-1px)] flex justify-between -translate-y-1/2"
                aria-hidden
              >
                {[0, 1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 w-px bg-stone-600/80"
                    style={{ opacity: i === 0 || i === 4 ? 0.35 : 0.55 }}
                  />
                ))}
              </div>
              <Slider
                value={[amount]}
                onValueChange={(v) => setAmount(v[0] ?? 2)}
                min={2}
                max={250}
                step={1}
                aria-label="Seleccionar aportación mensual entre 2 y 250 euros"
                className="relative z-[1] py-2"
                trackClassName="h-3 rounded-full border border-white/10 bg-stone-900/90 shadow-[inset_0_2px_6px_rgba(0,0,0,0.45)]"
                rangeClassName="bg-gradient-to-r from-[#FFB347] via-[#E2725B] to-[#d65a4a] shadow-[0_0_18px_rgba(226,114,91,0.3)]"
                thumbClassName="h-6 w-6 cursor-grab border-2 border-white bg-gradient-to-b from-white to-stone-100 text-[#E2725B] shadow-[0_3px_14px_rgba(0,0,0,0.35)] ring-2 ring-[#E2725B]/35 ring-offset-2 ring-offset-[#1c1917] hover:scale-105 active:cursor-grabbing active:scale-95 transition-transform focus-visible:ring-[#FFB347]"
                thumbIcon={<Heart className="h-3 w-3 fill-[#E2725B] text-[#E2725B]" strokeWidth={0} />}
              />
            </div>
            <div className="flex justify-between px-1 pt-0.5 text-[10px] tabular-nums text-stone-500 sm:text-[11px]">
              <span>2€</span>
              <span className="hidden sm:inline">50€</span>
              <span>100€</span>
              <span className="hidden sm:inline">175€</span>
              <span>250€</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
             <motion.div 
               key={impact.text}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               transition={{ type: "spring", stiffness: 300, damping: 20 }}
               className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-stone-900/50 p-4 sm:p-5 rounded-2xl border border-white/5 mb-6 shadow-inner"
             >
                <div className="p-3 bg-white/5 rounded-full shrink-0 shadow-lg border border-white/10">
                  {impact.icon}
                </div>
                <p className="text-sm sm:text-base md:text-lg text-stone-200 font-semibold text-left leading-snug">
                  {impact.text}
                </p>
             </motion.div>
          </AnimatePresence>

          <Button 
            className="w-full sm:w-auto bg-gradient-to-r from-[#FF8C6B] to-[#E2725B] hover:from-[#E2725B] hover:to-[#CC5B45] text-white rounded-full px-8 py-5 text-base font-black shadow-lg shadow-[#E2725B]/25 transition-transform hover:scale-[1.02]"
            onClick={fireConfetti}
          >
            Hacer magia por {amount}€ <Heart className="ml-2 fill-current" size={16}/>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

const FaqSection = () => {
  const faqs = [
    {
      question: '¿Y si tengo muy poco tiempo para ayudar, merece la pena?',
      answer: 'Sí. No todo es adoptar. Un paseo, una acogida corta, una donación puntual o unas horas de voluntariado pueden cambiarle el día y la vida a un perro.',
    },
    {
      question: 'Nunca he adoptado ni acogido, ¿encajaré aquí?',
      answer: 'Sí. Te acompañamos paso a paso. No necesitas experiencia previa, solo ganas de ayudar de una forma realista para ti.',
    },
    {
      question: '¿Es una opción asequible a largo plazo?',
      answer: 'Sí. Hay muchas formas de colaborar según tu momento. Desde una pequeña aportación hasta tiempo o acogida temporal, todo suma de verdad.',
    },
    {
      question: 'Tengo miedo de no saber manejar un caso complicado, ¿qué pasa entonces?',
      answer: 'No te dejamos solo. Valoramos contigo el caso, te orientamos y buscamos la forma de ayuda que mejor encaje con tu situación y con la del perro.',
    },
    {
      question: '¿En cuánto tiempo se nota el impacto de mi ayuda?',
      answer: 'Muchas veces, al momento. Una vacuna, una revisión veterinaria o una tarde de paseo pueden marcar una diferencia real ese mismo día.',
    },
    {
      question: 'Me implico mucho emocionalmente, ¿y si se me hace cuesta arriba?',
      answer: 'Es normal. Aquí trabajamos con corazón, pero también con acompañamiento. Ayudar no va de hacerlo perfecto, va de estar y sostener cuando hace falta.',
    },
  ];

  return (
    <section className="w-full bg-[#fafaf9] py-20 md:py-24 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="max-w-5xl mx-auto"
      >
        <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E2725B]/25 bg-[#E2725B]/[0.07] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#c45a47]">
            Preguntas frecuentes
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-zinc-900">
            Lo que todos nos preguntan antes de dar el paso
          </h2>
          <p className="mt-4 text-base md:text-lg text-stone-600 text-inter font-medium leading-relaxed">
            Sabemos que empezar cuesta. Estas son las dudas que más resolvemos en la primera conversación.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="rounded-[2rem] border border-stone-200 bg-white p-5 sm:p-6 shadow-[0_12px_40px_rgba(0,0,0,0.04)]">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question} className="border-stone-200">
                <AccordionTrigger className="grid grid-cols-[1fr_auto] items-center gap-3 py-5 hover:no-underline sm:gap-4 [&[data-state=open]>svg]:rotate-180">
                  <span className="w-full text-balance text-center text-base font-bold text-zinc-900 sm:text-lg">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-center text-sm text-stone-600 text-inter leading-relaxed sm:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </motion.div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="w-full bg-[#131110] pt-20 sm:pt-24 pb-28 sm:pb-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-stone-400">
      <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 w-[800px] h-[800px] bg-gradient-radial from-[#E2725B]/10 to-transparent rounded-full pointer-events-none blur-3xl" />
      <div className="absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/3 w-[600px] h-[600px] bg-gradient-radial from-[#FFB347]/5 to-transparent rounded-full pointer-events-none blur-3xl" />

      <motion.div 
         initial="hidden"
         whileInView="visible"
         viewport={{ once: true, margin: "-100px" }}
         variants={staggerContainer}
         className="max-w-6xl mx-auto relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 sm:pb-16">
          {/* Col 1 */}
          <motion.div variants={fadeUp} className="flex flex-col space-y-6 lg:col-span-1">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-gradient-to-br from-[#E2725B] to-[#FF8C6B] rounded-xl flex items-center justify-center">
                 <PawPrint className="text-white" size={20} />
               </div>
               <span className="text-xl font-bold text-stone-100 tracking-tight">Alma Canina</span>
             </div>
             <p className="text-sm text-stone-500 leading-relaxed text-inter">
               No somos un refugio, somos una estación de paso entre un pasado difícil y un futuro brillante. Cada acción cuenta.
             </p>
             <div className="flex gap-4 pt-2">
               <a href="#" className="w-10 h-10 rounded-full border border-stone-800 flex items-center justify-center hover:bg-[#E2725B] hover:text-white hover:border-[#E2725B] transition-all"><Instagram size={18}/></a>
               <a href="#" className="w-10 h-10 rounded-full border border-stone-800 flex items-center justify-center hover:bg-[#E2725B] hover:text-white hover:border-[#E2725B] transition-all"><Facebook size={18}/></a>
               <a href="#" className="w-10 h-10 rounded-full border border-stone-800 flex items-center justify-center hover:bg-[#E2725B] hover:text-white hover:border-[#E2725B] transition-all"><Twitter size={18}/></a>
             </div>
          </motion.div>

          {/* Col 2 */}
          <motion.div variants={fadeUp} className="flex flex-col space-y-4">
             <h4 className="text-stone-100 font-bold mb-2">Descubre</h4>
             <a href="#" className="text-sm hover:text-[#FFB347] transition-colors w-fit">Ver perros en adopción</a>
             <a href="#" className="text-sm hover:text-[#FFB347] transition-colors w-fit">Calculadora de impacto</a>
             <a href="#" className="text-sm hover:text-[#FFB347] transition-colors w-fit">Información de voluntariado</a>
             <a href="#" className="text-sm hover:text-[#FFB347] transition-colors w-fit">Casos de éxito (Blog)</a>
          </motion.div>

          {/* Col 3 */}
          <motion.div variants={fadeUp} className="flex flex-col space-y-4">
             <h4 className="text-stone-100 font-bold mb-2">Transparencia</h4>
             <a href="#" className="text-sm hover:text-[#E2725B] transition-colors w-fit">Informes anuales</a>
             <a href="#" className="text-sm hover:text-[#E2725B] transition-colors w-fit">Nuestros socios fundadores</a>
             <a href="#" className="text-sm hover:text-[#E2725B] transition-colors w-fit">Preguntas frecuentes</a>
             <a href="#" className="text-sm hover:text-[#E2725B] transition-colors w-fit">Legal y Privacidad</a>
          </motion.div>

          {/* Col 4 */}
          <motion.div variants={fadeUp} className="flex flex-col space-y-4">
             <h4 className="text-stone-100 font-bold mb-2">Contacto</h4>
             <div className="flex items-start gap-3 text-sm">
                <MapPin size={16} className="text-[#FF8C6B] mt-1 shrink-0"/>
                <span>Camino del Refugio s/n,<br/>28001 Madrid, España</span>
             </div>
             <div className="flex items-center gap-3 text-sm">
                <Mail size={16} className="text-[#FF8C6B] shrink-0"/>
                <a href="mailto:hola@almacanina.org" className="hover:text-white transition-colors">hola@almacanina.org</a>
             </div>
             <div className="flex items-center gap-3 text-sm">
                <Phone size={16} className="text-[#FF8C6B] shrink-0"/>
                <span>+34 600 000 000 (Solo WhatsApp)</span>
             </div>
          </motion.div>
        </div>

        {/* Big Call to action inside footer */}
        <motion.div variants={fadeUp} className="w-full bg-stone-900/50 backdrop-blur-md border border-stone-800 rounded-3xl p-8 sm:p-12 mt-4 mb-16 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
           <div>
              <h3 className="text-2xl sm:text-3xl font-black text-stone-100 mb-2">No dejes que mañana sea otro día en una jaula.</h3>
              <p className="text-stone-500 max-w-xl text-inter">Tú puedes encender la calefacción de un hogar real hoy mismo. Solo requiere una acción.</p>
           </div>
           <Button
             size="lg"
             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
             className="w-full sm:w-auto shrink-0 bg-[#fafaf9] hover:bg-stone-200 text-[#131110] font-black rounded-full px-10 py-7 text-xl shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-transform hover:scale-105"
           >
             Actuar Ahora
           </Button>
        </motion.div>

        <motion.div variants={fadeUp} className="w-full border-t border-stone-800/80 pt-8 flex flex-col md:flex-row justify-between items-center text-stone-600 text-xs sm:text-sm gap-4">
          <span className="font-medium text-inter tracking-wide">© 2026 Refugio Alma Canina. Organización sin ánimo de lucro #18920.</span>
          <span className="font-medium text-inter opacity-70">Desarrollado con ♥ para los que no tienen voz.</span>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-[#fafaf9] text-zinc-900 font-sans antialiased selection:bg-[#E2725B]/20 selection:text-[#E2725B] relative overflow-x-hidden pb-28 sm:pb-0">
      <AnimatedBackground />
      <LoveWall />
      <Header />
      <Hero />
      <DecisionBridge />
      <DecisionToResidentsDivider />
      <ResidentCarousel />
      <ResidentsToImpactDivider />
      <ImpactCalculator />
      <FaqSection />
      <Footer />

      {/* Sticky Mobile Bar - visible en viewport movil pequeño */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-xl border-t border-stone-200 z-50 pb-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
         <Button
            size="lg"
            onClick={() => document.getElementById('decision-bridge')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full bg-[#E2725B] text-white font-bold rounded-2xl py-6 text-xl shadow-[0_5px_20px_rgba(226,114,91,0.4)] hover:bg-[#CC5B45]"
          >
            Quiero ayudar hoy
          </Button>
      </div>
    </div>
  );
}
