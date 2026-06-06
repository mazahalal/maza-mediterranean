# Maza Mediterranean Cuisine — Project Specification

Maza Mediterranean Cuisine is an authentic Mediterranean restaurant located in Chandler, AZ.

Maza Mediterranean Cuisine is an authentic Mediterranean restaurant located in Chandler, AZ. The site conveys warmth, hospitality, and culinary tradition — a digital extension of the Mediterranean dining experience with rich earthy tones, generous imagery, and straightforward navigation.

## 2. Design Language

- **Aesthetic**: Warm Mediterranean — terracotta, olive, cream, and gold accents
- **Color Palette**:
  - Primary: `#8B4513` (Saddle Brown / terracotta)
  - Secondary: `#556B2F` (Dark Olive Green)
  - Accent: `#D4A017` (Gold)
  - Background: `#FDF5E6` (Old Lace / warm cream)
  - Text: `#2C1810` (Deep brown)
  - Light: `#F5E6D3` (warm light)
- **Typography**: Inter for body, Playfair Display for headings
- **Motion**: Minimal — subtle hover lifts on cards, smooth page transitions
- **Visual Assets**: Placeholder food and venue images via Unsplash

## 3. Layout & Structure

- **Navbar**: Logo left, nav links right — sticky, blurs on scroll
- **Footer**: Restaurant info, address, hours, social placeholder
- **Responsive**: Mobile-first with breakpoints at sm (640px), md (768px), lg (1024px)

## 4. Pages

### Home (/)
- Hero section: restaurant name, tagline, CTA button to Menu
- Brief "Welcome to Maza" intro section
- Featured highlights: Authentic Recipes, Fresh Ingredients, Family Atmosphere

### Menu (/menu)
- Categories: Appetizers, Mains, Sides, Desserts, Drinks
- Each item: name, description, price
- Typed data structure in `data/menu.ts`

### Gallery (/gallery)
- Grid of food and venue images (placeholder via Unsplash)
- 3-column grid on desktop, 1-column on mobile

### About (/about)
- Short blurb about Mediterranean cuisine and Maza's story
- Chandler AZ local flavor

### Contact (/contact)
- Address: 3491 W Frye Rd, Ste 2, Chandler, AZ 85226
- Hours: Open Daily 10am – 6pm
- Phone: (480) 534-6550
- Contact form layout (name, email, message, submit)

## 5. Components

- **Navbar**: Links to Home, Menu, Gallery, About, Contact
- **Footer**: Address, hours, restaurant name

## 6. Business Data

| Field | Value |
|-------|-------|
| Name | Maza Mediterranean Cuisine |
| Address | 3491 W Frye Rd, Ste 2, Chandler, AZ 85226 |
| Phone | (480) 534-6550 |
| Hours | Open Daily: 10am – 6pm |
| Domain | mazahalalfood.com |
| POS | Shift4 (future online ordering) |
| Delivery | DoorDash/UberEats (future) |

## 7. Local SEO

- **Google Business Profile**: Claim + verify (pending)
- **NAP consistency**: Name, Address, Phone identical everywhere
- **Schema**: Restaurant + LocalBusiness + OpeningHours JSON-LD
- **Keywords**: Mediterranean restaurant Chandler AZ, Halal food Chandler AZ, Mediterranean food Chandler
- **Geo**: Chandler AZ, 3491 W Frye Rd, GeoCoordinates lat 33.3098/long -111.8954

## 8. Technical Approach

- Next.js 14 with App Router
- TypeScript throughout
- Tailwind CSS for styling
- Typed menu data in `data/menu.ts`
- Environment: `.env.local` with `NEXT_PUBLIC_SITE_URL=https://mazahalalfood.com`
- Restaurant JSON-LD schema in layout

## 9. Deployment

- Vercel hosting (client account TBD)
- GitHub: `arealicehole/maza-mediterranean`
- `main` branch deployment
- DNS: Namecheap → Vercel (A: 76.76.21.21, CNAME: cname.vercel-dns.com)

## 10. Future Phases

- **Phase 2**: Online ordering via Shift4 POS integration
- **Phase 3**: DoorDash / UberEats integration
- **Phase 4**: Google Business Profile verification + reviews strategy
- **Phase 5**: Menu updates, seasonal items, photo gallery expansion