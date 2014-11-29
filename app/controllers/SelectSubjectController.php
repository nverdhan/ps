<?php

class SelectSubjectController extends BaseController {

  public function postTopics(){
    $subjectid = Input::get('subjectid');
    Session::put('currentsubjectid',$subjectid);
    $subject = Subject::find($subjectid);
    return Response::json($subject->getTopics());
  }