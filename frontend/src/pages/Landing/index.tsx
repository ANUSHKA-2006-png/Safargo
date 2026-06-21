import { Link } from "react-router-dom";
import { ArrowRight, Plane } from "lucide-react";
import { landingHighlights } from "../../constants/navigation";

export function Landing() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative min-h-[92vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85"
          alt="A scenic travel destination with mountains and water"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/55" />
        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link to="/" className="flex items-center gap-3 text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 backdrop-blur">
              <Plane className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold">Safargo</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-semibold text-white">
              Sign in
            </Link>
            <Link
              to="/register"
              className="focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-ocean px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#155985]"
            >
              Start planning
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </nav>
        <div className="relative z-10 mx-auto flex min-h-[72vh] max-w-7xl flex-col justify-center px-6 pb-20 pt-10 text-white">
          <p className="mb-4 max-w-xl text-sm font-semibold uppercase tracking-[0.18em] text-amber">AI travel intelligence</p>
          <h1 className="max-w-4xl text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">Safargo</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/90">
            Plan trips, tune budgets, compare destinations, prepare packing lists, and talk through every travel decision with an AI assistant built for practical itineraries.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {landingHighlights.map((item) => (
              <span key={item.label} className="inline-flex items-center gap-2 rounded-full bg-white/14 px-4 py-2 text-sm font-semibold backdrop-blur">
                <item.icon className="h-4 w-4" />
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
