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

export class GetPosts {
  static readonly type = '[Posts] Get Posts'
  constructor(public currentPage: number) { }
}

export class GetPostsSuccess {
  static readonly type = "[Posts] Get Posts Success";
  constructor(public data: Post[]) {
  }
}

export class GetPostsFailed {
  static readonly type = "[Posts] Get Posts Failed";
  constructor(public err: any) {
  }
}

export class GetPostsLength {
  static readonly type = '[Posts] Get Posts Length'
}

export class GetPostsLengthSuccess {
  static readonly type = "[Posts] Get Posts Length Success";
  constructor(public data: Post[]) { }
}

export class GetPostsLengthFailed {
  static readonly type = "[Posts] Get Posts Length Failed";
  constructor(public err: any) { }
}

export class GetPostById {
  static readonly type = '[Posts] Get Post By Id'
  constructor(public id: Number) { }

}
export class GetPostByIdSuccess {
  static readonly type = '[Posts] Get Post By Id Success'
  constructor(public data: any) { }
}

export class GetPostByIdFail {
  static readonly type = '[Posts] Get Post By Id Fail'
  constructor(public err: any) { }
}


export class GetPostComments {
  static readonly type = '[Posts] Get Post Comments'
  constructor(public id: Number) { }
}

export class GetPostCommentsSuccess {
  static readonly type = "[Posts] Get Post Comments Success";
  constructor(public data: PostComment[]) {
  }
}

export class GetPostCommentsFailed {
  static readonly type = "[Posts] Get Post Comments Failed";
  constructor(public err: any) {
  }
}

export class AddPostComment {
  static readonly type = '[Posts] Add Post Comment'
  constructor(public comment: Comment) { }

}
export class AddPostCommentSuccess {
  static readonly type = '[Posts] Add Post Success'
  constructor(public data: any) { }
}

export class AddPostCommentFail {
  static readonly type = '[Posts] Add Post Fail'
  constructor(public err: any) { }
}

