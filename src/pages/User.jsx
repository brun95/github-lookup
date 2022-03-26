import { useEffect, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import GithubContext from "../context/github/GithubContext"
import {FaCodepen, FaStore, FaUserFriends, FaUsers} from 'react-icons/fa'
import RepoList from "../components/repos/RepoList"
import {getUserAndRepos} from '../context/github/GithubActions'

const User = () => {
    const {user, loading, repos, dispatch} = useContext(GithubContext)
    const params = useParams()

    useEffect(() => {
        dispatch({type: 'SET_LOADING'})
        const getUserData = async() => {
            const userData = await getUserAndRepos(params.login)
            dispatch({type: 'GET_USER_AND_REPOS', payload: userData})
        }

        getUserData()
    }, [dispatch, params.login])

    const {
        name,
        type,
        avatar_url,
        location,
        bio,
        blog,
        twitter_username,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable,
      } = user

    if (loading){
        return (
            <div className="w-100 mt-20 mx-auto">       
                <svg role="status" class="mr-2 w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
                </svg>
            </div>
        )
    }

    const websiteUrl = blog?.startsWith('http') ? blog : 'https://' + blog

    return (
        <>
            <div className="w-full mx-auto lg:w-10/12">
                <div className="mb-4">
                    <Link to='/' className="btn btn-ghost">
                        Back To Search
                    </Link>
                </div>

                <div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8'>
                    <div className='custom-card-image mb-6 md:mb-0'>
                        <div className='rounded-lg shadow-xl card image-full'>
                        <figure>
                            <img src={avatar_url} alt='' />
                        </figure>
                        <div className='card-body justify-end'>
                            <h2 className='card-title mb-0'>{name}</h2>
                            <p>{login}</p>
                        </div>
                        </div>
                    </div>

                    <div className='col-span-2'>
                        <div className='mb-6'>
                        <h1 className='text-3xl card-title'>
                            {name}
                            <div className='ml-2 mr-1 badge badge-success'>{type}</div>
                            {hireable && (
                            <div className='mx-1 badge badge-info'>Hireable</div>
                            )}
                        </h1>
                        <p>{bio}</p>
                        <div className='mt-4 card-actions'>
                            <a
                            href={html_url}
                            target='_blank'
                            rel='noreferrer'
                            className='btn btn-outline'
                            >
                            Visit Github Profile
                            </a>
                        </div>
                        </div>

                        <div className='w-full rounded-lg shadow-md bg-base-100 stats'>
                        {location && (
                            <div className='stat'>
                            <div className='stat-title text-md'>Location</div>
                            <div className='text-lg stat-value'>{location}</div>
                            </div>
                        )}
                        {blog && (
                            <div className='stat'>
                            <div className='stat-title text-md'>Website</div>
                            <div className='text-lg stat-value'>
                                <a href={websiteUrl} target='_blank' rel='noreferrer'>
                                {websiteUrl}
                                </a>
                            </div>
                            </div>
                        )}
                        {twitter_username && (
                            <div className='stat'>
                            <div className='stat-title text-md'>Twitter</div>
                            <div className='text-lg stat-value'>
                                <a
                                href={`https://twitter.com/${twitter_username}`}
                                target='_blank'
                                rel='noreferrer'
                                >
                                {twitter_username}
                                </a>
                            </div>
                            </div>
                        )}
                        </div>
                    </div>
                </div>

                <div className='w-full py-5 mb-6 rounded-lg shadow-md bg-base-100 stats'>
                    <div className='grid grid-cols-1 md:grid-cols-3'>
                        <div className='stat'>
                            <div className='stat-figure text-accent'>
                                <FaUsers className='text-3xl md:text-5xl' />
                            </div>
                            <div className='stat-title pr-5'>Followers</div>
                            <div className='stat-value pr-5 text-3xl md:text-4xl'>
                                {followers}
                            </div>
                        </div>

                        <div className='stat'>
                            <div className='stat-figure text-accent'>
                                <FaUserFriends className='text-3xl md:text-5xl' />
                            </div>
                            <div className='stat-title pr-5'>Following</div>
                            <div className='stat-value pr-5 text-3xl md:text-4xl'>
                                {following}
                            </div>
                        </div>

                        <div className='stat'>
                            <div className='stat-figure text-accent'>
                                <FaCodepen className='text-3xl md:text-5xl' />
                            </div>
                            <div className='stat-title pr-5'>Public Repos</div>
                            <div className='stat-value pr-5 text-3xl md:text-4xl'>
                                {public_repos}
                            </div>
                        </div>

                        <div className='stat'>
                            <div className='stat-figure text-accent'>
                                <FaStore className='text-3xl md:text-5xl' />
                            </div>
                            <div className='stat-title pr-5'>Public Gists</div>
                                <div className='stat-value pr-5 text-3xl md:text-4xl'>
                                    {public_gists}
                                </div>
                            </div>
                        </div>
                    </div>

                    <RepoList repos={repos}/>
            </div>
        </>
    )
}

export default User