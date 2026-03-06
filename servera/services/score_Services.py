from models import Option

def calculate_score(answers):
    score = 0

    for ans in answers:
        option = Option.query.get(ans["option_id"])

        if option and option.is_correct:
            score += 1

    return score