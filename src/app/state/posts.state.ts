import { GetSearchPosts, GetSearchPostsSuccess, GetSearchPostsFailed } from './posts.actions';
import { PostsService, Post, PostComment } from '../services/posts.service';
import { State, Action, Selector, StateContext, NgxsOnInit } from '@ngxs/store';
import { Injectable } from '@angular/core';


export class PostsStateModel {
  posts!: Post[];
  post!: Post;
  searchPosts!: Post[];
  loadingSearchedPosts!: boolean;
  loadedSearchedPosts!: boolean;
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


}



