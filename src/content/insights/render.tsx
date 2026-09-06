import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { insightMdxComponents } from "@/components/insights/MdxComponents";

export async function renderInsightMdx(source: string) {
  const { content } = await compileMDX({
    source,
    components: insightMdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });
  return content;
}
