import type { MetaFunction } from "@remix-run/node";
import { TalkCard, type Talk } from "~/components/TalkCard";
import talksData from "~/data/talks.json";

export const meta: MetaFunction = () => {
  return [
    { title: "Talk Repository" },
    { name: "description", content: "A collection of talks and presentations" },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <header className="mb-12 text-center">
        <h1 className="mb-2 text-4xl font-bold text-gray-900">
          Talk Repository
        </h1>
        <p className="text-lg text-gray-600">
          Explore our collection of talks and presentations
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {talksData.map((talk: Talk, index: number) => (
          <TalkCard key={index} talk={talk} />
        ))}
      </div>
    </div>
  );
}
