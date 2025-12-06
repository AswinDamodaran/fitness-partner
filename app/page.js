import MainForm from "@/components/form/MainForm";
import Image from "next/image";

export default function Home() {
  return (
   <div className="bg-lightBg dark:bg-darkBg p-5 mx-auto flex items-center justify-center min-h-[90vh]">
    <MainForm/>
   </div>
  );
}
