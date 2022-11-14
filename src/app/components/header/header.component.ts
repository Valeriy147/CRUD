import { GetSearchPosts } from './../../state/posts.actions';
import { PostsState } from './../../state/posts.state';
import { Post } from './../../services/posts.service'
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnInit {

  phone = '0502864257'
  form!: FormGroup

  @Select(PostsState.getSearchPosts) searchPosts$!: Observable<Post[]>
  @Select(PostsState.getLoadingSearchedPosts) loading$!: Observable<boolean>
  @Select(PostsState.getLoadedSearchedPosts) loaded$!: Observable<boolean>


  constructor(private store: Store) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      input: new FormControl('', [Validators.required]),
    })
  }

  search() {
    if (this.form.valid) {
      const formData = { ...this.form.value }
      this.store.dispatch(new GetSearchPosts(formData.input))
    }
  }

  reset() {
    this.form.controls['input'].reset()
  }
}

