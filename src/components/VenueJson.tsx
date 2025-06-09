import { wilsonImages, courtYardImages } from "../constants";

export interface Venue {
  name?: string;
  route?: string;
  images?: any;
  description?: string;
  capacity?: number;
  minimum_booking_hours?: number;
  about_space?: {
    features?: string[];
    ideal_for_events?: {
      private_events?: string[];
      creative_educational?: string[];
      business_corporate?: string[];
      wellness_fitness?: string[];
    };
    purpose?: string;
    availability?: string;
  };
  features?: string[];
  notes?: string[];
  additional_information?: {
    furniture?: {
      tables?: {
        quantity?: number;
        notes?: string;
      };
      chairs?: {
        quantity?: number;
        notes?: string;
      };
    };
    outdoor_space?: {
      name?: string;
      size_sq_ft?: number;
      availability?: string;
    };
    restrooms?: {
      ada_accessible?: number;
      private_bathrooms_with_showers?: boolean;
    };
    parking?: {
      free_parking?: string;
      reserved_parking?: {
        cost_per_vehicle?: number;
        notes?: string;
        availability?: string[];
      };
    };
    food_and_beverage?: {
      food?: string;
      prep_area?: string;
      alcoholic_beverages?: string;
    };
  };
  event_rules?: {
    quiet_hours?: string;
    bookable_hours_notes?: string;
    allowed?: string[];
    required?: string[];
    general_rules?: string[];
    av_and_music?: string[];
  };
  house_rules?: string[];
}

export interface Venues {
  venues: Venue[];
}

export const venueJson: Venues = {
  venues: [
    {
      name: "The Wilson Room",
      route: "thewilsonroom",
      images: wilsonImages,
      description:
        "Discover a hidden gem in Downtown LA's Arts District. Revitalized from a historic Art Deco bank, this 4,300 square foot, two-story venue offers a unique blend of old-world charm and modern design. It can accommodate up to 120 people and has a 6-hour minimum booking time.",
      capacity: 120,
      minimum_booking_hours: 6,
      about_space: {
        features: [
          "built-in bar",
          "original bank vault",
          "prep areas",
          "showers",
          "breakout rooms",
        ],
        ideal_for_events: {
          private_events: [
            "Private Parties",
            "Birthday Parties",
            "Baby/Bridal Showers",
            "Cocktail Events",
            "Holiday Parties",
            "Social Mixers",
            "Intimate Weddings & Receptions",
          ],
          creative_educational: [
            "Influencer Pop-Ups",
            "Art Exhibitions",
            "Retail Pop-Ups",
            "Product Launches",
            "Creative Workshops",
            "Seminars",
            "Classes",
            "Readings",
            "Small Concerts",
            "Fashion Shows",
          ],
          business_corporate: [
            "Film or Photo Shoots",
            "Networking Events",
            "Corporate Meetings",
            "Business Meetings",
            "Board Meetings",
            "Brainstorming Sessions",
            "Casting",
            "Client Meetings",
            "Conference Room",
            "Career Expos",
            "Job Fairs",
            "Therapy Work Sessions",
            "Team Building",
            "Off-Sites",
          ],
          wellness_fitness: [
            "Wellness Retreats",
            "Yoga Classes & Studios",
            "Fitness & Workout Classes",
            "Dance Class & Studio",
          ],
        },
      },
      features: [
        "Conference / Break Out Rooms with Tables and Chairs",
        "Private Dressing Rooms with Curtains",
        "2 Private Bathrooms with Showers (body wash not included)",
        "Ample Free + Paid parking and easy ground floor load-in",
        "Beautiful Custom Chandeliers",
        "Large windows & Natural Light",
        "High Ceilings",
        "2 Floors",
        "Outlets throughout Venue",
        "Bar Nook for serving drinks",
        "2 Mini Fridges",
        "2 Large Ice Chests with Spigots (ice not included)",
        "Refillable Keg",
        "A/C & Central Heat",
      ],
      notes: [
        "Special Event Insurance is required. This can be selected as an Add-On in the booking flow or purchased directly from TheEventHelper.com. This general liability insurance coverage protects you, the event organizer, and the venue against claims of injury to attendees and damage to the venue.",
      ],
      additional_information: {
        furniture: {
          tables: {
            quantity: 5,
            notes:
              "Several tables are available throughout the unit; please do not move them. Most are on the mezzanine floor. Additional table rentals are available as an add-on and must be requested at least 5 business days ahead of the reservation day.",
          },
          chairs: {
            quantity: 15,
            notes:
              "Some chairs are available throughout the unit. Additional chair rentals are available as an add-on and must be requested at least 5 business days ahead of the reservation day.",
          },
        },
        outdoor_space: {
          name: "OUTDOOR GATED COURTYARD",
          size_sq_ft: 15000,
          availability:
            "available as an add-on space, standalone event space, or reserved parking (available all day weekends and weekday evenings after 6:30 PM). Inquire for details or if interested in booking as a standalone event space.",
        },
        restrooms: {
          ada_accessible: 2,
          private_bathrooms_with_showers: true,
        },
        parking: {
          reserved_parking: {
            cost_per_vehicle: 20,
            notes: "reduced rates for bulk reservations.",
            availability: [
              "Up to 30 spots available for reservation after 6:30 PM M-F.",
              "Up to 30 spots available for reservation all day Saturday & Sunday.",
            ],
          },
        },
        food_and_beverage: {
          food: "Outside food and non-alcoholic beverages are allowed. No cooking is permitted on-site.",
          prep_area:
            "A food prep area is available in the back, but it does not include a stove top or other equipment. Accommodations might be possible if requested ahead of time, depending on the request. No open flames are allowed.",
          alcoholic_beverages:
            "Guests can bring their own alcohol (beer, wine, and seltzers only). Liquor must be served by a licensed vendor.",
        },
      },
      event_rules: {
        quiet_hours: "Loud music or noise must end by 12:00 AM.",
        bookable_hours_notes: "Hours may be adjusted upon request.",
        allowed: ["Confetti", "glitter", "pets", "ticketed events"],
        required: ["Large events require hired security."],
        av_and_music: [
          "DJs are allowed.",
          "Live music is allowed.",
          "Amplified music is allowed.",
        ],
      },
      house_rules: [
        "SPECIAL EVENT INSURANCE is required.",
        "NO SMOKING inside the space. Smoke inside the space will incur a $500 fine.",
        "Alcohol usage within the space is permitted with prior approval. Complaints from neighbors or other building tenants about inebriated guests will result in a $500 fee per incident.",
        "No sale of food and drinks on the property. Food trucks outside of the building are permitted.",
        "Outside catering is allowed, but NO OPEN FLAMES. There is no commercial kitchen for cooking.",
        "Clients are welcome to decorate but must be careful not to damage walls or floors. All decor must be removed; anything left behind will be subject to an additional $300 clean-up fee.",
        "Leave the space as you found it. Feel free to move items, but return them to their designated place before leaving.",
        "Setup and clean-up must be within your booking period.",
        "A mandatory deep cleaning fee of $250 applies.",
        "Overtime: Overtime is billed in 30-minute increments at 1.5x the hourly rate. No exceptions.",
        "SECURITY DETAIL is required for certain types of events.",
        "All events must end by 12 AM (1 AM latest for cleaning/tear-down). Clients must allocate tear-down time, clear the space, and remove all belongings from the building by 1 AM.",
        "Security cameras are present in common areas inside the unit and outside. Please ask if you need indoor security cameras shut off.",
      ],
    },
    {
      name: "The Courtyard",
      route: "thecourtyard",
      images: courtYardImages,
      description:
        "This expansive 15,000 sq ft outdoor gated courtyard is available as an add-on space, a standalone event venue, or for reserved parking. It can accommodate up to 120 people and has a 6-hour minimum booking time.",
      capacity: 120,
      minimum_booking_hours: 6,
      about_space: {
        purpose: "perfect for events and reserved parking.",
        availability:
          "available all day on weekends and weekday evenings after 6:30 PM.",
      },
      features: ["Coming soon..."],
      notes: [
        "Special Event Insurance is required. You can select this as an add-on during the booking process or purchase it directly from TheEventHelper.com. This general liability insurance protects you, the event organizer, and the venue against claims of injury to attendees and damage to the venue.",
      ],
      additional_information: {
        furniture: {
          tables: {
            quantity: 1,
            notes:
              "Additional table rentals are available as an add-on and must be requested at least 5 business days before your reservation.",
          },
          chairs: {
            quantity: 2,
            notes:
              "Additional chair rentals are available as an add-on and must be requested at least 5 business days before your reservation.",
          },
        },
        restrooms: {
          ada_accessible: 2,
          private_bathrooms_with_showers: true,
        },
        parking: {
          free_parking:
            "There's ample street parking around the building, available on a first-come, first-served basis. Feel free to ask us for more details!",
          reserved_parking: {
            cost_per_vehicle: 20,
            notes: "with reduced rates for bulk reservations.",
            availability: [
              "Up to 30 spots can be reserved after 6:30 PM from Monday to Friday.",
              "Up to 30 spots can be reserved all day on Saturday and Sunday.",
            ],
          },
        },
        food_and_beverage: {
          food: "You're welcome to bring outside food and non-alcoholic beverages. Please note that no cooking is allowed on-site.",
          alcoholic_beverages:
            "Guests can bring their own alcohol, but it must be beer, wine, or seltzers only. If you plan to serve liquor, it must be handled by a licensed vendor.",
        },
      },
      event_rules: {
        quiet_hours: "Any loud music or noise must end by 12:00 AM.",
        bookable_hours_notes:
          "We may be able to adjust booking hours upon request.",
        general_rules: [
          "Confetti",
          "glitter",
          "pets",
          "ticketed events are all allowed.",
        ],
        required: ["For large events, hired security is required."],
        av_and_music: [
          "DJs are welcome.",
          "Live music is permitted.",
          "Amplified music is allowed.",
        ],
      },
      house_rules: [
        "SPECIAL EVENT INSURANCE is required.",
        "NO SMOKING inside the space. A $500 fine will be issued for smoking indoors.",
        "Alcohol use is permitted with prior approval. Any complaints from neighbors or other building tenants about inebriated guests will result in a $500 fee per incident.",
        "The sale of food and drinks is not allowed on our property, but food trucks outside the building are fine!",
        "Outside catering is permitted, but NO OPEN FLAMES. Please be aware that we do not have a commercial kitchen for cooking.",
        "Clients are welcome to decorate as they wish, but please be careful not to damage the walls or floors. All decor must be removed when you leave; anything left behind will incur an additional $300 clean-up fee.",
        "Leave the space as you found it. Feel free to move things around, but please return them to their original designated place before you leave.",
        "Your setup and clean-up must occur within your booked period.",
        "A mandatory deep cleaning fee of $250 applies.",
        "Overtime: Overtime is billed in 30-minute increments at 1.5 times the hourly rate, with no exceptions.",
        "SECURITY DETAIL is required for certain types of events.",
        "All events must conclude by 12 AM (1 AM at the latest for cleaning/tear-down). Clients must factor in tear-down time, clear the space, and ensure all belongings are out of the building by 1 AM.",
        "Security cameras are present in common areas inside the unit and outside. Please ask if you need indoor security cameras turned off.",
      ],
    },
  ],
};
