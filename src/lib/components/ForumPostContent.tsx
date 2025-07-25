import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
export default function ForumPostContent({ content }: { content: string }) {
  return (
    <div
      className="text-lg break-after-all break-word"
      style={{ whiteSpace: "pre-line" }}
    >
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          em(props) {
            const { node, ...rest } = props;
            return <span className="italic" {...rest} />;
          },
          h1(props) {
            const { node, ...rest } = props;
            return <span className="text-2xl font-bold block" {...rest} />;
          },
          h2(props) {
            const { node, ...rest } = props;
            return <span className="text-xl font-bold block" {...rest} />;
          },
          h3(props) {
            const { node, ...rest } = props;
            return <span className="text-lg font-bold block" {...rest} />;
          },
          a(props) {
            const { node, ...rest } = props;
            return (
              <Link
                href={props.href || ""}
                target="_blank"
                className="text-blue-500 cursor-pointer hover:underline"
                {...rest}
              />
            );
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
