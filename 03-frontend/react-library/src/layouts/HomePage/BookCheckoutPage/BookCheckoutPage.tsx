import { useEffect, useState } from "react";
import BookModel from "../../../models/BookModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { StartReview } from "../../Utils/StartReview";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";
import { LatestReview } from "./LatestReviews";
import ReviewModel from "../../../models/ReviewModel";

export const BookCheckoutPage = () => {

    const [book, setBook] = useState<BookModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    //review Srate
    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [totalStarts, setTotalStarts] = useState(0);
    const [isLoadingReview, setIsLoadingReview] = useState(true);

    const bookId = (window.location.pathname).split('/')[2];

    //async được sử dụng trong hàm fetchBook để tạo một hàm bất đồng bộ. 
    //Hàm này được sử dụng để thực hiện một cuộc gọi HTTP bất đồng bộ đến một API 
    //được định nghĩa bằng URL baseUrl
    useEffect(() => {
        const fetchBook = async () => {
            const baseUrl: string = `http://localhost:8080/api/books/${bookId}`;

            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }

            const responseJson = await response.json();

            const loadedBook: BookModel = {
                id: responseJson.id,
                title: responseJson.title,
                author: responseJson.author,
                description: responseJson.description,
                copies: responseJson.copies,
                copiesAvailable: responseJson.copiesAvailable,
                category: responseJson.category,
                img: responseJson.img
            };

            setBook(loadedBook);
            setIsLoading(false);
        };
        fetchBook().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.messege);
        })
        window.scrollTo(0, 0);
    }, []);
    // Sau mỗi lần thay đổi currentPage, sẽ chạy lại hook
    // Mảng rỗng nghĩa là `useEffect` chỉ chạy một lần sau khi component được render lần đầu tiên

    useEffect(() => {
        const fetchBookReviews = async () => {
            const ReviewUrl: string = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`;

            const responseReviews = await fetch(ReviewUrl);

            if (!responseReviews.ok) {
                throw new Error("Something went wrong!");
            }

            const responseJsonReviews = await responseReviews.json();

            const responseData = responseJsonReviews._embedded.reviews;

            const loadedReviews: ReviewModel[] = []; 

            let weightedStartreviews: number = 0;

            for(const key in responseData){
                loadedReviews.push({
                    id: responseData[key].id,
                    userEmail: responseData[key].userEmail,
                    date: responseData[key].date,
                    rating: responseData[key].rating,
                    bookId: responseData[key].bookId,
                    reviewDescription: responseData[key].reviewDescription,
                });
                weightedStartreviews = weightedStartreviews + responseData[key].rating;
            }

            if(loadedReviews){
                const round = (Math.round((weightedStartreviews / loadedReviews.length) * 2) / 2).toFixed(1);
                setTotalStarts(Number(round));
            }

            setReviews(loadedReviews)
            setIsLoadingReview(false);
        };

        fetchBookReviews().catch((error: any) => {
            setIsLoadingReview(false);
            setHttpError(error.messege);
        })
    }, []);
    
    if (isLoading || isLoadingReview) {
        return (
            <SpinnerLoading />
        )
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    return (
        <div>
            <div className="container d-none d-lg-block">
                <div className="row mt-5 ">
                    <div className="col-sm-2 col-md-3">
                        {book?.img ?
                            <img src={book?.img} width='226' height='349' alt="Book" />
                            :
                            <img src={require('../../../Images/BooksImages/book-luv2code-1000.png')} width='226'
                                height='349' alt="Book" />
                        }
                    </div>
                    <div className="col-4 col-md-4 container">
                        <div className="ml-2">
                            <h2>{book?.title}</h2>
                            <h5 className='text-primary'>{book?.author}</h5>
                            <p className="lead">{book?.description}</p>
                            <StartReview rating={totalStarts} size={25} />
                        </div>
                    </div>
                    <CheckoutAndReviewBox book={book} mobile={false} />
                </div>
                <hr />
                <LatestReview reviews={reviews} bookId={book?.id} mobile={false}/>
                <hr/>
            </div>
            <div className="container d-lg-none mt-5">
                <div className="d-flex justify-contain-center alighn-items-center">
                    {book?.img ?
                        <img src={book?.img} width='226' height='349' alt="Book" />
                        :
                        <img src={require('../../../Images/BooksImages/book-luv2code-1000.png')} width='226'
                            height='349' alt="Book" />
                    }
                </div>
                <div className="mt-4">
                    <div className="ml-2">
                        <h2>{book?.title}</h2>
                        <h5 className='text-primary'>{book?.author}</h5>
                        <p className="lead">{book?.description}</p>
                        <StartReview rating={totalStarts} size={25} />
                    </div>
                </div>
                <CheckoutAndReviewBox book={book} mobile={true} />
                <hr />
                <LatestReview reviews={reviews} bookId={book?.id} mobile={true}/>
            </div>
        </div>
    );
}