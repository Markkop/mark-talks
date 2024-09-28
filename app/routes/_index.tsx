import type { MetaFunction } from "@remix-run/node";
import { TalkCard } from "~/components/TalkCard";
import { SparklesCore } from "~/components/ui/sparkles";
import talks from "~/data/talks.json";

export const meta: MetaFunction = () => {
  return [
    { title: "Mark Kop Talks" },
    { name: "description", content: "A list of talks by Mark Kop" },
  ];
};

export default function Index() {
  const sortedTalks = [...talks].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <main className="px-4 py-8 relative z-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedTalks.map((talk, index) => (
            <TalkCard key={index} talk={talk} />
          ))}
        </div>
      </main>
    </div>
  );
}
