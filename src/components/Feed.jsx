import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import axios from 'axios'
import { BASEURL } from '../utils/constants'
import UserCard from './UserCard'


const Feed = () => {

    const feed = useSelector(store => store.feed)
    const dispatch = useDispatch()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const feedData = async () => {
        try {
            if (feed && feed.length > 0) {
                setIsLoading(false)
                return;
            }

            const { data } = await axios.get(BASEURL + '/api/feed', { withCredentials: true })
            dispatch(addFeed(data.data))
            setIsLoading(false)

        } catch (error) {
            console.log(`Error fetching feed data: ${error}`);
            setError('Failed to load feed. Please try again.')
            setIsLoading(false)
        }
    }

    useEffect(() => {
        feedData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (isLoading) {
        return (
            <div className='flex justify-center items-center my-10'>
                <span className='loading loading-spinner loading-lg'></span>
            </div>
        )
    }

    if (error) {
        return (
            <div className='alert alert-error my-10'>
                <span>{error}</span>
            </div>
        )
    }

    if (!feed || feed.length === 0) {
        return (
            <div className='text-center my-10'>
                <p className='text-lg'>No users to display</p>
            </div>
        )
    }

    return (
        <div className='flex flex-col items-center gap-4 my-10'>
            <UserCard user={feed[0]} />
        </div>
    )
}

export default Feed
