import type {
  AdminHomeContentStore,
  AdminHomeDifferentiationCard,
  AdminHomeMedia,
  AdminHomeProgramItem,
  AdminHomeTaggedCard,
  AdminHomeTestimonial,
  AdminHomeTextItem,
  AdminHomeTitleCopyItem,
} from "@/lib/admin/home-content";

export type PublicHomeMedia = AdminHomeMedia;
export type PublicHomeTextItem = AdminHomeTextItem;
export type PublicHomeTitleCopyItem = AdminHomeTitleCopyItem;
export type PublicHomeTaggedCard = AdminHomeTaggedCard;
export type PublicHomeProgramItem = AdminHomeProgramItem;
export type PublicHomeDifferentiationCard = AdminHomeDifferentiationCard;
export type PublicHomeTestimonial = AdminHomeTestimonial;

export type PublicHomeContent = Omit<AdminHomeContentStore, "updatedAt">;
