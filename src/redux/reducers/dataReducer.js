import {
    SET_POSTS,
    LIKE_POST,
    UNLIKE_POST,
    LOADING_DATA,
    DELETE_POST,
    UPLOAD_POST,
    ADD_POSTS,
    FILTER_POSTS,
    RESTORE_POSTS,
    SET_POST
} from '../types'

const initialState = {
    posts: [],
    post: {},
    loading: false,

};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true,
            }

            case FILTER_POSTS:
                return {
                    ...state,
                    posts: action.payload
                }

                case RESTORE_POSTS:
                    return {
                        ...state,
                        posts: action.payload
                    }


                    case SET_POSTS:
                        return {
                            ...state,
                            posts: action.payload,
                                loading: false,
                        }

                        case ADD_POSTS:
                            return {
                                ...state,
                                posts: state.posts.concat(action.payload),
                            }


                            case UNLIKE_POST:
                            case LIKE_POST:
                                let index = state.posts.findIndex((post) => post.postId === action.payload.postId);
                                state.posts[index] = action.payload;
                                return {
                                    ...state,
                                }

                                case DELETE_POST:
                                    let index1 = state.posts.findIndex(post => post.postId === action.payload);
                                    state.posts.splice(index1, 1);
                                    return {
                                        ...state
                                    };

                                case UPLOAD_POST:
                                    return {
                                        ...state,
                                        posts: [
                                            action.payload,
                                            ...state.posts
                                        ]
                                    }
                                    case SET_POST:
                                        return{
                                            ...state,
                                            post: action.payload,
                                        }

                                    default:
                                        return state;






    }
}