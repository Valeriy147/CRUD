import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PostComment } from './../../../services/posts.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {

  @Input() comment!: PostComment
  @Input() children!: any
  @Output() toReply = new EventEmitter<any>()

  reply(obj: any) {
    this.toReply.emit(obj)
  }
}
