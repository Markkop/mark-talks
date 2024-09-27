import type { MetaFunction } from "@remix-run/node";
import { TalkCard, type Talk } from "~/components/TalkCard";
import talks from "~/data/talks.json";

export const meta: MetaFunction = () => {
  return [
    { title: "Mark Kop Talks" },
    { name: "description", content: "A list of talks by Mark Kop" },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(talks as Talk[]).map((talk, index) => (
            <TalkCard key={index} talk={talk} />
          ))}
        </div>
      </main>
    </div>
  );
}
