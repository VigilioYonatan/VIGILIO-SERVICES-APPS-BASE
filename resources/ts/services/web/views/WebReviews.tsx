import { printFotoReviews } from "@/reviews/lib/helpers";
import { ReviewsSchemaFromServe } from "@/reviews/schemas/reviews.schema";
import { printFileUser } from "@/users/lib/helpers";
import { Rating } from "react-custom-rating-component";
import { Carousel } from "react-responsive-carousel";
import { useMedia } from "~/hooks/useMediaQuery";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import enviroments from "~/config";
import { authPermissionModifierGuard } from "@/auth/stores/auth.store";

interface WebReviewsProps {
    reviews: ReviewsSchemaFromServe[];
}
function WebReviews({ reviews }: WebReviewsProps) {
    return (
        <div class="w-full webreviews">
            <Carousel
                centerMode
                autoPlay
                centerSlidePercentage={
                    useMedia({
                        mobile: 75,
                        minitablet: 65,
                        tablet: 45,
                        laptop: 35,
                        custom: 75,
                    }) as number
                }
                className="w-full"
                swipeable
                showStatus={false}
                showArrows={false}
                animationHandler="slide"
                showThumbs={false}
            >
                {reviews.map((review) => (
                    <div class=" dark:bg-paper-dark bg-background-light p-2 md:p-6 flex flex-col text-start mx-2  shadow-md group hover:bg-primary dark:hover:bg-primary delay-custom-1 h-[200px]  md:h-[240px] justify-between">
                        {authPermissionModifierGuard() ? (
                            <a
                                href={`${enviroments.VITE_URL}/admin/reviews/${review.id}`}
                                target="_blank"
                                rel="noreferrer"
                                class="absolute ml-1 bg-background-light dark:bg-background-dark dark:text-secondary-light p-1 rounded-md"
                            >
                                <i class="fa-solid fa-pen" />
                            </a>
                        ) : null}

                        <i class="fa fa-quote-left fa-2x text-primary text-5xl group-hover:text-white" />
                        <p class="self-start text-start font-vigilio-p  group-hover:text-white line-clamp-3">
                            {review.review}
                        </p>
                        <div class="flex gap-4 items-center">
                            <img
                                src={
                                    review.user_id
                                        ? printFileUser(
                                              review.user.foto,
                                              300
                                          )[0]
                                        : printFotoReviews(review.foto)[0]
                                }
                                width={50}
                                height={50}
                                alt=""
                                class="rounded-full min-w-[50px] max-w-[50px] object-cover"
                            />
                            <div class="flex flex-col">
                                <span class="text-primary  group-hover:text-white font-bold">
                                    {review.user_id
                                        ? `${review.user.name} ${
                                              review.user.father_lastname || ""
                                          }`
                                        : review.name}
                                </span>
                                <Rating
                                    classNames="group-hover:[&>div>div>div]:text-[#fff!important]"
                                    readOnly
                                    defaultValue={review.star}
                                    precision={0.5}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
            <style jsx>{`
                .webreviews .control-dots {
                    position: relative !important;
                    bottom: -10px;
                }
                .webreviews .dot {
                    width: 15px !important;
                    height: 15px !important;
                    background-color: var(--primary) !important;
                }

                @media (max-width: 700px) {
                    .webreviews .dot {
                        width: 12px !important;
                        height: 12px !important;
                        background-color: var(--primary) !important;
                    }
                }
            `}</style>
            <script>
                const dots = document.querySelectorAll('.webreviews
                .control-dots')[0]; const status =
                document.getElementsByClassName('carousel-status')[0]; const
                parent = dots.parentNode; parent.insertBefore(dots, status);
            </script>
        </div>
    );
}
export default WebReviews;
