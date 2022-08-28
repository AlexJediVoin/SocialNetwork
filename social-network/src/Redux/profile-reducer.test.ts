import profileReducer, {addPostCreator,
    deletePostCreator, ProfilePageType, setStatusCreator, setUserProfile, UserProfileType} from "./profile-reducer";

let initialState: ProfilePageType = {
    posts: [
        {id: "1", message: "Hi, how are you?", likesCount: 2},
        {id: "2", message: "It's my first post.", likesCount: 5},
        {id: "3", message: "Hi, how are you?", likesCount: 2},
        {id: "4", message: "It's my first post.", likesCount: 5}],
    profile: null,
    status: "",
};

let Profile: UserProfileType = {
    userId: 2,
    aboutMe: "Iam Bob",
    lookingForAJob: true,
    lookingForAJobDescription: "programming engineer",
    fullName: "Bob",
    contacts: {
        github: null,
        vk: null,
        facebook: null,
        instagram: null,
        twitter: null,
        website: null,
        youtube: null,
        mainLink: null,
    },
    photos: {
        small: null,
        large: null,
    }
};

let Prof: ProfilePageType = {
    posts: [
        {id: "1", message: "Hi, how are you?", likesCount: 2},
        {id: "2", message: "It's my first post.", likesCount: 5},
        {id: "3", message: "Hi, how are you?", likesCount: 2},
        {id: "4", message: "It's my first post.", likesCount: 5}],
    status: "in progress",
    profile: Profile,
}


test('new post should be added', () => {

    let action = addPostCreator("Any text added");
    let newState = profileReducer(initialState, action);

    expect(initialState.posts.length).toBe(4);
    expect(newState.posts[4].message).toBe("Any text added");
})

test('in profile must be set user profile', () => {

    let action = setUserProfile({
        userId: 3,
        aboutMe: "Iam Alex",
        lookingForAJob: true,
        lookingForAJobDescription: "tester",
        fullName: "Alex",
        contacts: {
            github: null,
            vk: null,
            facebook: null,
            instagram: null,
            twitter: null,
            website: null,
            youtube: null,
            mainLink: null,
        },
        photos: {
            small: null,
            large: null,
        }
    });
    let newState = profileReducer(Prof, action);

    expect(newState.profile?.fullName).toBe("Alex");
    expect(newState.profile?.aboutMe).toBe("Iam Alex");
    expect(newState.profile).toEqual({
        userId: 3,
        aboutMe: "Iam Alex",
        lookingForAJob: true,
        lookingForAJobDescription: "tester",
        fullName: "Alex",
        contacts: {
            github: null,
            vk: null,
            facebook: null,
            instagram: null,
            twitter: null,
            website: null,
            youtube: null,
            mainLink: null,
        },
        photos: {
            small: null,
            large: null,
        }
    })
})

test('after deleting lenght of message should be decrement ', () => {

    let action = deletePostCreator("1");
    let newState = profileReducer(initialState, action);

    expect(newState.posts.length).toBe(3);
    expect(newState.posts.some(p=> p.id === "1")).toBeFalsy();
})