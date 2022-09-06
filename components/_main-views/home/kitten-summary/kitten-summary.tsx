import Link from "next/link";
import Image from "next/image";
import { KittenSummaryInfo } from "../home.types";

const KittenSummary: React.FC<KittenSummaryInfo> = ({ description, picture, link }) => {
      //!--
  return (
    <div className="kitten-summary">
      {picture}<Image src={'/'+picture} width={300} height={300} />
      <p>
        {description}
        <br/>
      </p>
    </div>
  );
};

export default KittenSummary;