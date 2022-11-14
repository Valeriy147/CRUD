import {
  GetPostById,
  GetPostByIdSuccess,
  GetPostByIdFail,
  GetPostComments,
  GetPostCommentsSuccess,
  GetPostCommentsFailed,
  AddPostComment,
  AddPostCommentSuccess,
  AddPostCommentFail,
  GetSearchPosts,
  GetSearchPostsSuccess,
  GetSearchPostsFailed,
  GetPosts,
  GetPostsSuccess,
  GetPostsFailed,
  GetPostsLength,
  GetPostsLengthSuccess,
  GetPostsLengthFailed
} from './posts.actions';
import { PostsService, Post, PostComment } from '../services/posts.service';
import { State, Action, Selector, StateContext, NgxsOnInit } from '@ngxs/store';
import { Injectable } from '@angular/core';


export class PostsStateModel {
  posts!: Post[];
  post!: Post;
  searchPosts!: Post[];
  loadingSearchedPosts!: boolean;
  loadedSearchedPosts!: boolean;
  firstLayerComments!: PostComment[];
  childrenComments!: {};
  totalPostsCount!: number[]
  pageSize!: number;
  loadingPostComments!: boolean
  loadedPostComments!: boolean
  loadingPosts!: boolean;
  loadedPosts!: boolean;

  loadingAdd!: boolean;
  loadedAdd!: boolean;
}

@State<PostsStateModel>({
  name: 'posts',
  defaults: {
    posts: [],
    post: {
      id: 0,
      img: '',
      author: '',
      name: '',
      date: '',
      content: ''
    },
    searchPosts: [],
    loadingSearchedPosts: false,
    loadedSearchedPosts: false,
    firstLayerComments: [],
    childrenComments: {},
    totalPostsCount: [],
    pageSize!: 9,
    loadingPostComments: false,
    loadedPostComments: false,
    loadingPosts: false,
    loadedPosts: false,
    loadingAdd!: false,
    loadedAdd!: false
  }
})
@Injectable()
export class PostsState implements NgxsOnInit {

  @Selector() static getSearchPosts(state: PostsStateModel) {
    return state.searchPosts;
  }

  @Selector() static getLoadingSearchedPosts(state: PostsStateModel) {
    return state.loadingSearchedPosts && !state.loadedSearchedPosts;
  }

  @Selector() static getLoadedSearchedPosts(state: PostsStateModel) {
    return state.loadedSearchedPosts && !state.loadingSearchedPosts;
  }

  @Selector() static GetPosts(state: PostsStateModel) {
    return state.posts;
  }

  @Selector() static getTotalPostsCount(state: PostsStateModel) {
    return state.totalPostsCount;
  }

  @Selector() static GetFirstLayerComments(state: PostsStateModel) {
    return state.firstLayerComments;
  }

  @Selector() static GetChildrenComments(state: PostsStateModel) {
    return state.childrenComments;
  }

  @Selector() static getLoadingPostComments(state: PostsStateModel) {
    return state.loadingPostComments && !state.loadedPostComments;
  }

  @Selector() static getLoadedPostComments(state: PostsStateModel) {
    return state.loadedPostComments && !state.loadingPostComments;
  }

  @Selector() static getPostById(state: PostsStateModel) {
    return state.post;
  }

  @Selector() static getLoadingPosts(state: PostsStateModel) {
    return state.loadingPosts && !state.loadedPosts;
  }

  @Selector() static getLoadedPosts(state: PostsStateModel) {
    return state.loadedPosts && !state.loadingPosts;
  }

  @Selector() static getLoadedAdd(state: PostsStateModel) {
    return !state.loadingAdd && state.loadedAdd
  }

  @Selector() static getErrorAdd(state: PostsStateModel) {
    return !state.loadingAdd && !state.loadedAdd
  }
  constructor(private postsService: PostsService) { }

  ngxsOnInit(ctx: StateContext<PostsStateModel>) {
  }

  @Action(GetSearchPosts)
  getSearchPosts(ctx: StateContext<PostsStateModel>, { name }: GetSearchPosts) {
    ctx.patchState({
      loadingSearchedPosts: true,
      loadedSearchedPosts: false,
    });
    return this.postsService.getSearchPosts(name).subscribe(
      response => ctx.dispatch(new GetSearchPostsSuccess(response)),
      err => ctx.dispatch(new GetSearchPostsFailed(err))
    )
  }


  @Action(GetSearchPostsSuccess)
  getSearchPostsSuccess(ctx: StateContext<PostsStateModel>, response: GetSearchPostsSuccess) {
    ctx.patchState({
      loadingSearchedPosts: false,
      loadedSearchedPosts: true,
      searchPosts: response.data
    });
  }

  @Action(GetSearchPostsFailed)
  getSearchPostsFailed(ctx: StateContext<PostsStateModel>, err: GetSearchPostsFailed) {
    ctx.patchState({
      loadingSearchedPosts: false,
      loadedSearchedPosts: false,
    });
  }

  @Action(GetPosts)
  getPosts(ctx: StateContext<PostsStateModel>, { currentPage }: GetPosts) {
    ctx.patchState({
      loadingPosts: true,
      loadedPosts: false,
    });
    return this.postsService.getPosts(currentPage, ctx.getState().pageSize).subscribe(
      response => ctx.dispatch(new GetPostsSuccess(response)),
      err => ctx.dispatch(new GetPostsFailed(err))
    )
  }


  @Action(GetPostsSuccess)
  getPostsSuccess(ctx: StateContext<PostsStateModel>, response: GetPostsSuccess) {
    ctx.patchState({
      loadingPosts: false,
      loadedPosts: true,
      posts: response.data,
    });
  }

  @Action(GetPostsFailed)
  getPostsFailed(ctx: StateContext<PostsStateModel>, err: GetPostsFailed) {
    ctx.patchState({
      loadingPosts: false,
      loadedPosts: false,
    });
  }

  @Action(GetPostsLength)
  getPostsLength(ctx: StateContext<PostsStateModel>) {
    ctx.patchState({
      loadingPosts: true,
      loadedPosts: false,
    });
    return this.postsService.getPostsLength().subscribe(
      response => ctx.dispatch(new GetPostsLengthSuccess(response)),
      err => ctx.dispatch(new GetPostsLengthFailed(err))
    )
  }

  @Action(GetPostsLengthSuccess)
  getPostsLengthSuccess(ctx: StateContext<PostsStateModel>, response: GetPostsLengthSuccess) {
    let count = ((Math.ceil(response.data.length / ctx.getState().pageSize)))
    let pages = []
    for (let i = 1; i <= count; i++) {
      pages.push(i)
    }
    ctx.patchState({
      loadingPosts: false,
      loadedPosts: true,
      totalPostsCount: pages
    });
  }

  @Action(GetPostsLengthFailed)
  getPostsLengthFailed(ctx: StateContext<PostsStateModel>, err: GetPostsLengthFailed) {
    ctx.patchState({
      loadingPosts: false,
      loadedPosts: false,
    });
  }

  @Action(GetPostById)
  getPostById(ctx: StateContext<PostsStateModel>, { id }: GetPostById) {
    this.postsService.getById(id).subscribe(
      response => ctx.dispatch(new GetPostByIdSuccess(response)),
      err => ctx.dispatch(new GetPostByIdFail(err))
    )
  }

  @Action(GetPostByIdSuccess)
  getPostByIdSuccess(ctx: StateContext<PostsStateModel>, { data }: GetPostByIdSuccess) {
    ctx.patchState({
      post: data
    })
  }

  @Action(GetPostByIdFail)
  getPostByIdFail(ctx: StateContext<PostsStateModel>, { err }: GetPostByIdFail) {
    console.warn(err)
  }

  @Action(GetPostComments)
  getPostComments(ctx: StateContext<PostsStateModel>, { id }: GetPostComments) {
    ctx.patchState({
      loadingPostComments: true,
      loadedPostComments: false,
    });
    return this.postsService.getPostComments(id).subscribe(
      response => ctx.dispatch(new GetPostCommentsSuccess(response)),
      err => ctx.dispatch(new GetPostCommentsFailed(err))
    )
  }

  @Action(GetPostCommentsSuccess)
  getPostCommentsSuccess(ctx: StateContext<PostsStateModel>, response: GetPostCommentsSuccess) {
    let firstLayer: any = []
    let usedKeys: any = []
    let children: any = {}
    response.data.forEach(elem => {
      if (!elem.inheritance) {
        firstLayer.push(elem)
      } else if (!usedKeys.includes(elem.inheritance)) {
        children = { ...children, [elem.inheritance]: [{ ...elem }] }
        usedKeys.push(+elem.inheritance)
      } else { children = { ...children, [elem.inheritance]: [...children[elem.inheritance], elem] } }
    })
    ctx.patchState({
      loadingPostComments: false,
      loadedPostComments: true,
      firstLayerComments: firstLayer,
      childrenComments: children
    });
  }

  @Action(GetPostCommentsFailed)
  getPostCommentsFailed(ctx: StateContext<PostsStateModel>, err: GetPostCommentsFailed) {
    ctx.patchState({
      loadingPostComments: false,
      loadedPostComments: false,
    });
  }

  @Action(AddPostComment)
  addPostCommentd(ctx: StateContext<PostsStateModel>, { comment }: AddPostComment) {
    ctx.patchState({
      loadingAdd: true,
      loadedAdd: false,
    });
    this.postsService.addComment(comment).subscribe(
      response => ctx.dispatch(new AddPostCommentSuccess(response)),
      error => ctx.dispatch(new AddPostCommentFail(error))
    )
  }

  @Action(AddPostCommentSuccess)
  addPostCommentSuccess({ patchState, getState }: StateContext<PostsStateModel>, { data }: AddPostCommentSuccess) {
    const firstLayerComments: any = getState().firstLayerComments
    const childrenComments: any = getState().childrenComments
    if (!data.inheritance) {
      patchState({
        loadingAdd: false,
        loadedAdd: true,
        firstLayerComments: [...firstLayerComments, data]
      })
    } else if (childrenComments[data.inheritance]) {
      patchState({
        loadingAdd: false,
        loadedAdd: true,
        childrenComments: { ...childrenComments, [data.inheritance]: [...childrenComments[data.inheritance], data] }
      })
    } else {
      patchState({
        loadingAdd: false,
        loadedAdd: true,
        childrenComments: { ...childrenComments, [data.inheritance]: [data] }
      })
    }
  }


  @Action(AddPostCommentFail)
  addPostCommentFail(ctx: StateContext<PostsStateModel>, { err }: AddPostCommentFail) {
    ctx.patchState({
      loadingAdd: false,
      loadedAdd: false,
    });
    console.warn(err)
  }
}



