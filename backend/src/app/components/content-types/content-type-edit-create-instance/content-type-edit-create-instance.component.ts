import { Component, OnInit, Input } from "@angular/core";
import { ContentTypesService } from "../../../../../projects/sonic-core/src/lib/services/content-types.service";
import { ContentService } from "../../../../../projects/sonic-core/src/lib/services/content.service";

import { FieldTypesService } from "../../../../../projects/sonic-core/src/lib/services/field-types.service";
import { FormControl, FormGroup, NgControlStatus } from "@angular/forms";
import { QuestionService } from "../../../../../projects/sonic-core/src/lib/services/question.service";

@Component({
  selector: "app-content-type-edit-create-instance",
  templateUrl: "./content-type-edit-create-instance.component.html",
  styleUrls: ["./content-type-edit-create-instance.component.css"],
  providers: [QuestionService]
})
export class ContentTypeEditCreateInstanceComponent implements OnInit {
  constructor(
    private contentTypesService: ContentTypesService,
    private fieldTypesService: FieldTypesService,
    private questionService: QuestionService,
    private contentService: ContentService
  ) {}

  questions: any;
  isDataAvailable = false;

  instanceForm = new FormGroup({
    title: new FormControl(),
    firstName: new FormControl()
  });
  ngOnInit() {
    // console.log("ContentTypeEditCreateInstanceComponent:OnInit");
    // console.log("questions", this.questions);

    if (this.contentTypesService.contentType) {
      this.setQuestions(this.contentTypesService.contentType.controls);
    } else {
      this.loadQuestions();
    }
  }

  subscribeOnFormSubmit() {
    // this.formsComponent.formSubmittedSubject.subscribe(data => {
    //   console.log("formsComponent.formSubmittedSubject arrived:", data);
    // });
  }

  onSubmitContentAdd(payload) {
    console.log('onSubmitContentAdd:payload', payload);
    payload.contentType = this.contentTypesService.contentType.systemid;
    this.contentService.createContentInstance(payload);
  }

  loadQuestions() {
    // console.log('loadQuestions');
    this.contentTypesService.contentTypeSubject.subscribe(data => {
      // console.log(data);
      this.setQuestions(data.controls);
    });
  }

  setQuestions(questions) {
    // console.log('setQuestions');

    this.questions = questions;
    this.isDataAvailable = true;
  }
}
