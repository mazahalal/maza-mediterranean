import { menuData } from '@/data/menu';
import MenuBoard from './MenuBoard';

export default function MenuBoardPage() {
  return (
    <div className="min-h-screen bg-[#0A1F1E] flex items-center justify-center p-8">
      <MenuBoard menuData={menuData} />
    </div>
  );
}
