# SearchParty
* 팀원 : 박준모
* 사용자 별로 설문을 통해 정부의 정책이나 각 이슈에 대한 입장을 알아내고 해당 사용자의 입장과 가장 비슷한 정당을 찾아주는 서비스이다.

## Approach
인터넷 상에서는 해당 커뮤니티의 대세를 어기는 정치적 신념을 가졌다는 것을 밝히면 많은 비난을 받게 된다. (ex. RedXt, 오늘의 XX 등) <p>
따라서 그런 사람들은 본인의 정치색을 밝히기 힘들고 부끄러워 숨게 된다. (ex. 샤이 홍준표, 샤이 트럼프) <p>
이 서비스에서는 사회적 인식과는 독립적으로 사용자가 본인이 선호하는 정책에 대한 선택들을 근거로 본인과 가장 잘 맞는 정당을 찾아준다. <p>
이를 통해 사용자가 본인의 정치적 신념을 정책을 근거로 둔 논리적인 선택이라는 정당화를 할 수 있게 해준다. <p>
이렇게 본인의 정치적 신념을 논리적으로 이야기한다면 정치적 신념이 서로 다른 사람들이 서로 단순한 비난을 하는 경향을 줄일 수 있다고 생각한다. <p>
서로 정치색이 다르다는 이유로 비난하지 않게 된다면, 정치적 소수파도 본인의 생각을 잘 밝힐 수 있게 될 것이다.

## Persona
서울의 모 대학에 다니는 김씨(26)는 유머글 중심으로 올라오는 어떤 인터넷 커뮤니티의 회원이다. <p>
그는 평소에 특정 지역 출신이라 해당 지역에서 주로 지지하는 정당에 항상 투표해왔다. <p>
대선 시즌에 해당 정당에서 나온 후보에 투표를 하고 그것을 본인이 주로 활동하던 커뮤니티에 인증했는데, 그 후보는 해당 커뮤니티에서 선호하는 후보와는 경쟁 관계였기에 엄청난 비난과 원색적인 욕설을 듣게 되었다. <p>
그는 이런 단순한 비난들에 충격을 받고, 이런 현상을 줄일 수 있는 서비스를 원한다.

## Goal
정책 기반으로 사용자와 가장 잘 맞는 정당을 찾아주어 정당에 대한 선호를 감성의 영역이 아닌 이성의 영역으로 만든다. <p>
이를 통해 서로 지지하는 정당이 다르다는 이유로 비난하는 행위를 줄인다.

## Reference
* `The effect of speediness on personality questionnaires: an experiment on applicants within a job recruiting procedure`라는 논문을 참고했다.

### 가설
1. 응답 시간에 시간 제한을 두면 `fake good`을 줄일 수 있을 것이다.
2. 응답 형식이 아날로그 스케일이면 예, 아니오로 되어있는 것보다 `fake good`을 줄일 수 있을 것이다.
3. 경고문을 넣으면 `fake good`을 줄일 수 있을 것이다.
* `fake good` : 본인의 실제 성향보다 사회적으로 적절하다고 생각되는 응답을 선택하는 현상.

### 테스트 방법
* 각 가설마다 가설을 지키는 것, 지키지 않는 것 2가지로 나눠 2^3 = 8가지로 지원자들을 나눠서 테스트했다.

### 결론
* 경고문은 별 소용이 없었고, 아날로그 스케일의 대답 형식을 쓰는 것과 제한 시간을 두는 것이 좋다는 결과가 나왔다.
* 다만 시간 제한을 너무 짧게 두면 빠르게 대답해야 한다는 압박감에 제대로 이해하지 못하고 그냥 랜덤한 선택을 했다.