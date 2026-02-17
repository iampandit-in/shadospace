export default async function TutorialPage({
  params,
}: {
  params: Promise<{ tutorial: string }>;
}) {
  const { tutorial } = await params;
  return <div className="container">Tutorial Page {tutorial}</div>;
}
