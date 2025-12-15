import lolLogo from "@/assets/images/games/lol/lol-logo.png";
import Dropdown from "../Dropdown";
import Image from "next/image";

export default function GameSelectDropdown() {
  return (
    <Dropdown
      placeholder="게임을 선택해주세요"
      value="lol"
      items={[
        {
          value: "lol",
          label: (
            <div className="flex items-center gap-2.5">
              {" "}
              <Image
                src={lolLogo}
                alt={`lol icon`}
                width={20}
                className="object-cover"
              />
              <span>리그 오브 레전드</span>
            </div>
          ),
        },
      ]}
      onValueChange={() => {}}
      name="selectedGame"
      className="bg-bg-tertiary w-42.5 border-none px-3 py-2 font-semibold"
    />
  );
}
