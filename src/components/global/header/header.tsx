import { ModeToggle } from "@/components/ui/mode-toggle";

interface HeaderProps extends HeaderBoxProps {}

export const Header: React.FC<HeaderProps> = ({
  title,
  type,
  user,
  subtext,
}) => {
  return (
    <header className="flex justify-between items-center">
      <div>
        <h1 className="header-box-title">
          {title}
          {type === "greeting" && (
            <span className="text-violet-600">&nbsp;{user}</span>
          )}
        </h1>
        <p className="header-box-subtext ">{subtext}</p>
      </div>
    </header>
  );
};
