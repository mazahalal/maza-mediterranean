import { menuData } from '@/data/menu';
import MenuBoard from './MenuBoard';

export const metadata = {
  alternates: { canonical: "https://mazahalalfood.com/menu-board" },
  title: "Menu Board | Maza Mediterranean Cuisine",
};

export default async function MenuBoardPage({
  searchParams,
}: {
  searchParams: Promise<{ screen?: string; shawarma?: string }>;
}) {
  const params = await searchParams;
  const screen = params.screen === '2' ? 2 : 1;
  const includeShawarma = params.shawarma !== 'false';

  return (
    <div className="min-h-screen bg-[#0A1F1E] flex items-center justify-center p-8">
      <MenuBoard menuData={menuData} screen={screen} includeShawarma={includeShawarma} />
    </div>
  );
}
