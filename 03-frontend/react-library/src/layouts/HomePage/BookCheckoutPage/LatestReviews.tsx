import { Link } from "react-router-dom";
import { Review } from "../../Utils/Review";
import ReviewModel from "../../../models/ReviewModel";

export const LatestReview: React.FC<{
    reviews: ReviewModel[], bookId: number | undefined, mobile: boolean
}> = (props) => {

    return (
        <div className={props.mobile ? "mt-3" : "row mt-5"}>
            <div className={props.mobile ? "" : "col-sm-2 col-md-2"}>
                <h2>latest review</h2>
            </div>
            <div className="col-sm-10 col-md-10">
                {props.reviews.length > 0 ?
                    <>
                        {props.reviews.slice(0, 3).map(eachReview => (
                            <Review review={eachReview} key={eachReview.id}/>
                        ))}

                        <div className="mt-3">
                            <Link type="button" className="btn main-color btn-md text-white" to={""}>
                                Reach all reviews.
                            </Link>
                        </div>
                    </>
                    :
                    <div className="mt-3">
                        <p className="lead">
                            Currrently there are no reiews for this books
                        </p>
                    </div>
                }
            </div>
        </div>
    );
}