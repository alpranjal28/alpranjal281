interface SectionHeaderProps {
  subHeader: string;
  mainHeader: string;
}

const SectionHeader = ({ subHeader, mainHeader }: SectionHeaderProps) => {
  return (
    <div className=" text-center flex flex-col items-center justify-center">
      <h3 className="uppercase  font-semibold text-gray-500 leading-4">
        {subHeader}
      </h3>
      <h2 className="text-primary font-bold text-4xl italic">{mainHeader}</h2>
    </div>
  );
};
export default SectionHeader;
