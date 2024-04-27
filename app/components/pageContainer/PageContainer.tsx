interface Props {
  title?: string;
  children?: any;
  tabs?: Array<any>;
  subtitle?: string;
  width?: string;
}

const PageContainer: React.FC<Props> = ({
  title,
  children,
  tabs,
  subtitle,
  width = "max-w-screen-xl",
}) => {
  return (
    <div
      className={
        "mx-auto   flex-wrap items-center justify-between px-2 " + width
      }
    >
      {children}
    </div>
  );
};
export default PageContainer;
