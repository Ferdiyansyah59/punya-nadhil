"use client";

import { notFound, useParams } from "next/navigation";
import { useQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";
import ImageComponent from "@/components/micro/ImageComponent";
import CharacterInformation from "@/components/detailCharacter/characterInformation";
import LocationInfo from "@/components/detailCharacter/locationInfo";
import Episode from "@/components/detailCharacter/epsiode";
import { GET_DETAIL_CHARACTER } from "@/data/queries";
import AssignButton from "@/components/detailCharacter/asignButton";
import LocationAsignModal from "@/components/detailCharacter/LocationAsignModal";
import { ArrowLeftFromLine } from "lucide-react";
import Link from "next/link";

function DetailCharacter() {
  const params = useParams();

  const id = params.id;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customLocation, setCustomLocation] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const assignments = JSON.parse(
        localStorage.getItem("character_assignments") || "{}"
      );
      if (assignments[id]) {
        setCustomLocation(assignments[id]);
      }
    }
  }, [id]);

  const { loading, error, data } = useQuery(GET_DETAIL_CHARACTER, {
    variables: { id },
  });

  if (loading) return <div>Loading...</div>;
  if (error || !data?.character) return notFound();

  const { character: char } = data;
  const displayLocation = customLocation || char.location?.name;
  const isCustom = !!customLocation;

  return (
    <section className="p-5 md:p-20">
      <div className="bg-gray-100 dark:bg-zinc-900 grid xl:grid-cols-2 gap-5">
        <ImageComponent src={char.image} alt={char.name} priority={true} />
        <div className="p-6 space-y-8">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 w-fit bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 hover:border-blue-500 dark:hover:border-blue-500 text-sm font-medium rounded-lg shadow-sm transition-all group"
          >
            <ArrowLeftFromLine
              size={16}
              className="text-gray-500 group-hover:text-blue-500 transition-colors"
            />

            <span className="hidden sm:inline">Back to Character List</span>
          </Link>

          <div className="relative">
            <AssignButton onClick={() => setIsModalOpen(true)} />
            <CharacterInformation data={char} />
          </div>
          <LocationInfo
            data={char}
            location={displayLocation}
            isCustom={isCustom}
          />
          <Episode data={char} />
        </div>
      </div>
      {isModalOpen && (
        <LocationAsignModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          charName={char.name}
          charId={id}
          onUpdate={(newLoc) => setCustomLocation(newLoc)}
        />
      )}
    </section>
  );
}

export default DetailCharacter;
