# Decentralized Family Feud Poll

Functions:

[write] - "submit new question" (owner only)
        -> string (new question)

[read] - "get answerable questions"
       -> ()  -> string[] questions

[write] - "submit answer"
       -> string answer

[read] - "get question stats"
       -> uint questionId -> (sring[] answers, uint[] answerCount )