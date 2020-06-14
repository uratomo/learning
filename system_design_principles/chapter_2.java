// ２章

//// 場合分けをSTIで実現

// 料金区分の定義

enum FeeType {
  adult( new AdultFee() ),
  child( new ChildFee() ),
  senior( new SeniorFee() );

  private Fee fee;
  //  Feeインターフェースを実装したどれかのクラスのオブジェクト

  private FeeType(Fee fee) {
    this.fee = fee; //料金区分ごとのオブジェクトを設定する
  }

  Yen yen(){
    return fee.yen();
  }

  String label(){
    return fee.label();
  }
}



//// 状態遷移を管理する

enum State {
  審査中,
  承認者,
  実施中,
  終了,
  差し戻し中,
  中断者
}

State[] states = State.values(); // 状態の一覧
Set nextState = EnumSet.of(承認済,差し戻し中); //　状態のグルーピング

// ある状態から遷移できるかを確認する

class StateTransitions {
  Mao<State,Set<State>> allowed;

  {
    allowed = new HashMap<>();

    allowed.put(審査中,EnumSet.of(承認済,差し戻し中));
    allowed.put(差し戻し中,EnumSet.of(審査中,終了));
    allowed.put(承認済,EnumSet.of(実施中,終了));
    allowed.put(実施中,EnumSet.of(中断者,終了));
    allowed.put(中断中,EnumSet.of(実施中,終了));
  }
}
