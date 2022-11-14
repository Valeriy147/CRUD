import { Post, PostComment } from '../services/posts.service';

export class GetSearchPosts {
  static readonly type = '[Posts] Get Search Posts'
  constructor(public name: String) { }
}

export class GetSearchPostsSuccess {
  static readonly type = "[Posts] Get Search Posts Success";

  constructor(public data: Post[]) {
  }
}

export class GetSearchPostsFailed {
  static readonly type = "[Posts] Get Search Posts Failed";

  constructor(public err: any) {
  }
}
