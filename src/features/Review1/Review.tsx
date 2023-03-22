
import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Review } from '../../models/Review';
import { getReviewAsync, selectReviews, addReviewAsync, delReviewAsync, updReviewAsync } from './reviewSlice';



export const Review1 = () => {
    const reviews = useAppSelector(selectReviews);
    const dispatch = useAppDispatch();

    const [item, setItem] = useState(0);
    const [profile, setProfile] = useState(0);
    const [rating, setRating] = useState(0);
    const [review1, setReview] = useState("");
    const [errorm, setErrorMsg] = useState("");



    useEffect(() => {
        dispatch(getReviewAsync());
    }, [dispatch]);


    const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newItem = parseInt(e.target.value);
        setItem(newItem);
    };


    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newProfile = parseInt(e.target.value);
        setProfile(newProfile);
    };

    const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newRating = parseInt(e.target.value);
        setRating(newRating);
    };

    const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReview(e.target.value);
    };




    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("review", review1);
        formData.append("rating", String(rating));
        formData.append("profile", String(profile));
        formData.append("item", String(item));

        dispatch(addReviewAsync(formData));
    };


    const handleUp = (review: Review | null) => (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!review || !review.id) {
            setErrorMsg("Cannot update product: ID is missing");
            return;
        }
        const formData = new FormData();
        formData.append("id", String(review.id));
        formData.append("rating", String(rating || review.rating));
        formData.append("profile", String(profile || review.profile));
        formData.append("item", String(item || review.item));
        formData.append("review", (review1 || review.review1));
        console.log("Form Data:");
        console.log(formData.keys, formData.values);

        dispatch(updReviewAsync({ formData, id: review.id }));
    };


    return (
        <div style={{ display: 'flex' }}>
            <div>
                <h1>Reviews in my class: {reviews.length}</h1>
                {reviews && reviews.map((rev, i) => (
                    <div key={i}>
                        ID: {rev?.id},
                        <br></br>
                        Item: {rev?.item}
                        <br></br>
                        Rating: {rev?.rating}
                        <button onClick={() => dispatch(delReviewAsync(rev.id || -1))}>
                            Del
                        </button>
                        <form onSubmit={handleUp(rev)}>
                            <button type='submit'>Update
                            </button>
                        </form>
                    </div>
                ))}
            </div>
            <br></br>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Item:
                        <input type="number" value={item} onChange={handleItemChange} required />
                    </label>
                </div>
                <div>
                    <label>
                        Review:
                        <textarea value={review1} onChange={handleReviewChange} />
                    </label>
                </div>
                <div>
                    <label>
                        Profile:
                        <input type="number" value={profile} onChange={handleProfileChange} required />
                    </label>
                </div>
                <div>
                    <label>
                        Rating:
                        <input type="number" value={rating} onChange={handleRatingChange} required />
                    </label>
                </div>
                <br></br>
                <br></br>

                <button type="submit">Submit</button>
            </form>
        </div>

    );
};
