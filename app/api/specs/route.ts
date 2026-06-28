import { NextResponse } from 'next/server';
import { menuData } from '../../../data/menu';

/**
 * MAZ-64: specs.json — ACO (Agentic Commerce Optimization) endpoint.
 *
 * Bible Section 6: "Maintain a specs.json file as the source of truth for product attributes."
 * This endpoint exposes the full Maza menu as structured JSON for AI agents
 * (Gemini, ChatGPT, etc.) to read without scraping HTML.
 *
 * Utility signals per Bible:
 * - availability: all items "available" (real-time inventory is MAZ-65)
 * - dietary: halal certification, vegetarian flags
 * - sustainability: "halal-certified", "made-in-house-daily"
 * - category, price, description, image
 */

function buildSpecs() {
  const baseUrl = 'https://mazahalalfood.com';

  const items = menuData.flatMap((section) =>
    section.items.map((item) => {
      // Parse price string to number for agents
      const priceNum = item.price === 'Free' ? 0 : parseFloat(item.price.replace('$', ''));

      // Determine dietary attributes from item name/notes
      const name = item.name.toLowerCase();
      const isFalafel = name.includes('falafel');
      const isVegetarian =
        isFalafel ||
        name.includes('hummus') ||
        name.includes('tabouleh') ||
        name.includes('tabbouleh') ||
        name.includes('baba ghanoush') ||
        name.includes('appetizer plate') ||
        name.includes('side salad') ||
        name.includes('dolma') ||
        name.includes('samosa') && name.includes('veggie');

      const description =
        item.description ||
        item.note ||
        (item.notes ? item.notes.join(' ') : '') ||
        '';

      return {
        id: item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        name: item.name,
        category: section.category,
        categorySubtitle: section.subtitle || '',
        description,
        price: {
          amount: priceNum,
          currency: 'USD',
          display: item.price,
        },
        availability: 'available',
        dietary: {
          halal: true,
          vegetarian: isVegetarian || false,
          vegan: isFalafel || false,
        },
        sustainability: ['halal-certified', 'made-in-house-daily'],
        image: item.image ? `${baseUrl}${item.image}` : undefined,
        url: `${baseUrl}/menu`,
      };
    })
  );

  return {
    schema: 'maza-menu-specs/v1',
    description:
      'Structured menu specifications for Maza Mediterranean Cuisine — source of truth for AI agents and agentic commerce.',
    provider: {
      name: 'Maza Mediterranean Cuisine',
      url: baseUrl,
      phone: '(480) 534-6550',
      address: {
        street: '3491 W Frye Rd, Suite 2',
        city: 'Chandler',
        state: 'AZ',
        zip: '85226',
        country: 'US',
      },
      hours: {
        tue_wed: '10:00-20:00',
        thu_sun: '10:00-22:00',
        closed: ['Monday'],
      },
    },
    utilitySignals: {
      availability: true,
      dietary: true,
      sustainability: true,
      pricing: true,
    },
    itemCount: items.length,
    items,
    lastUpdated: new Date().toISOString(),
  };
}

export async function GET() {
  const specs = buildSpecs();

  return NextResponse.json(specs, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
    },
  });
}