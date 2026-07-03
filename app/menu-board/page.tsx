import { menuData } from '@/data/menu';
import MenuBoard from './MenuBoard';

export const metadata = {
  alternates: { canonical: "https://mazahalalfood.com/menu-board" },
  title: "Menu Board | Maza Mediterranean Cuisine",
};

export default function MenuBoardPage() {
  return (
    <div className="min-h-screen bg-[#0A1F1E] flex items-center justify-center p-8">
      <MenuBoard menuData={menuData} />
    </div>
  );
}
