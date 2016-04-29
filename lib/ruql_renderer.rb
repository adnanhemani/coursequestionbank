
class RuqlRenderer

  def self.render_from_json(json_code, uuid, prev_uuid)
    result = ""
    return "" if json_code == nil || json_code.length <= 2
    json_hash = JSON.parse(json_code)
    answers = json_hash["answers"]
    return ruql_true_false(json_hash) if json_hash["question_type"] == "TrueFalse"
<<<<<<< HEAD
    result << ruql_question_header(json_hash, uuid)
    if not uuid.blank?
      result << "\n  uid " + uuid
    end
=======
    result << ruql_question_header(json_hash)
    result << "\n  uuid #{uuid}" if uuid
    result << "\n  # uuid #{prev_uuid}" if prev_uuid
>>>>>>> 9d77fad0ded6aa84fea9f9c39e1fa71ac0ecb1e0
    result << "\n  text " + json_hash["question_text"].inspect
    answers.each do |answer| # answers first
      result << ruql_answer_line(answer) if answer["correct"]
    end
    answers.each do |answer| # distractors second
      result << ruql_answer_line(answer) if !answer["correct"]
    end
    result << "\nend"
    return result
  end

  def self.ruql_true_false(json_hash)
    line = "truefalse "
    line += json_hash["question_text"].inspect
    json_hash["answers"].each do |answer|
      if answer["correct"]
        line += answer["answer_text"].inspect
      end
      if answer["explanation"]
        line += ', :explanation => ' + answer["explanation"].inspect
      end
    end
    return line
  end


  def self.ruql_question_header(json_hash)
    line = case json_hash["question_type"]
      when "SelectMultiple" then "select_multiple"
      when "MultipleChoice" then "choice_answer"
      when "FillIn" then "fill_in"
      else ""
    end
    options = ['randomize', 'raw'].select{|x| json_hash[x]}.map{|x| ":#{x} => true"}.join(', ')
    line += ' ' + options if options != ''
    return line + " do"
  end

  def self.ruql_answer_line(answer)
    line = "\n  "
    line += answer["correct"] ? "answer" : "distractor"
    line += ' ' + answer["answer_text"].inspect
    if answer["explanation"]
      line += ', :explanation => ' + answer["explanation"].inspect
    end
    return line
  end

end
