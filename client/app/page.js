import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  LayoutDashboard,
  BellRing,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none -z-10" />

      <main className="max-w-5xl mx-auto px-6 text-center z-10 w-full py-20 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-sm font-medium text-slate-300 mb-8 animate-fade-in">
          {/* <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> */}
          Task Manager
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
          Organize smarter <br className="hidden md:block" />
          <span className="text-primary">Achieve</span> Faster
        </h1>

        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Transform the way you work with an intuitive task manager that keeps
          your deadlines in check, your priorities clear, and your productivity
          at its peak{" "}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
          <Link href="/register" className="btn-primary py-3 px-8 text-lg">
            Get Started
            <ArrowRight className="w-5 h-5 ml-1" />
          </Link>
          <Link href="/login" className="btn-secondary py-3 px-8 text-lg">
            Login
          </Link>
        </div>
      </main>

      {/* Feature Grid */}
      <section className="w-full max-w-6xl mx-auto px-6 py-20 mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card border-t border-t-primary/50 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Smart Tasks</h3>
          <p className="text-slate-400">
            Organize your work with priorities, deadlines, and real-time status
            tracking all in one place.
          </p>
        </div>

        <div className="card border-t border-t-purple-500/50 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Visual Dashboard</h3>
          <p className="text-slate-400">
            Track pending and completed tasks smoothly from a single screen
            interface.
          </p>
        </div>

        <div className="card border-t border-t-emerald-500/50 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
            <BellRing className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Intelligent Tracking</h3>
          <p className="text-slate-400">
            Keep an eye on overdue items with built-in visual highlighting and
            stats.
          </p>
        </div>
      </section>
    </div>
  );
}
