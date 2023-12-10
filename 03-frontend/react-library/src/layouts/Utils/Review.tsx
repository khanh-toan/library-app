import ReviewModel from "../../models/ReviewModel";
import { StartReview } from "./StartReview";

export const Review: React.FC<{ review: ReviewModel }> = (props) => {

    const date = new Date(String(props.review.date));

    const longMonth = date.toLocaleString('en-us', { month: 'long' });
    const dateDay = date.getDate();
    const dateYear = date.getFullYear();

    const dateRender = longMonth + ' ' + dateDay + ', ' + dateYear;

    return (
        <div className="col-sm-8 col-md-8">
            <h5>{props.review.userEmail}</h5>
            <div className="row">
                <div className="col">
                    {dateRender}
                </div>
                <div>
                    <StartReview rating={props.review.rating} size={16} />
                </div>
            </div>
            <div className="mt-2">
                <p>
                    {props.review.reviewDescription}
                </p>
            </div>
        </div>
    );
}