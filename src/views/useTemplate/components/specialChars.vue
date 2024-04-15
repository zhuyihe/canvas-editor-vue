<template>
  <div class="specialChars">
    <el-tabs>
      <el-tab-pane label="特殊符号">
        <div class="chars" @click="clickChars" @dblclick="dblChars">
          <p>℃</p>
          <p>℉</p>
          <p>＄</p>
          <p>￥</p>
          <p>〒</p>
          <p>￠</p>
          <p>￡</p>
          <p>﹪</p>
          <p>‰</p>
          <p>○</p>
          <p>※</p>
          <p>§</p>
          <p>＃</p>
          <p>№</p>
          <p>〓</p>
          <p>○</p>
          <p>●</p>
          <p>△</p>
          <p>▲</p>
          <p>◎</p>
          <p>☆</p>
          <p>★</p>
          <p>◇</p>
          <p>◆</p>
          <p>□</p>
          <p>☑</p>
          <p>■</p>
          <p>♀</p>
          <p>♂</p>
          <p>↑</p>
          <p>↓</p>
          <p>←</p>
          <p>→</p>
          <p>Ⓗ</p>
          <p>…</p>
          <p>々</p>
          <p>～</p>
          <p>‖ˉ</p>
          <p>ˉ</p>
          <p>﹏</p>
          <p>‘</p>
          <p>’</p>
          <p>“</p>
          <p>”</p>
          <p>（</p>
          <p>）</p>
          <p>{</p>
          <p>}</p>
          <p>〖</p>
          <p>〗</p>
          <p>【</p>
          <p>】</p>
          <p>《</p>
          <p>》</p>
          <p>「</p>
          <p>」</p>
          <p>『</p>
          <p>』</p>
          <p>—</p>
          <p>┓</p>
          <p>┃</p>
          <p>┛</p>
          <p>㎡</p>
          <!-- <p>㎏</p>
                    <p>㎜</p>
                    <p>㎝</p>
                    <p>㎞</p>
                    <p>㎡</p>
                    <p>㏄</p>
                    <p>㏎</p>
                    <p>㏑</p>
                    <p>㏒</p>
                    <p>㏕</p> -->
        </div>
      </el-tab-pane>
      <el-tab-pane label="数学符号">
        <div class="chars" @click="clickChars" @dblclick="dblChars">
          <p>Ⅰ</p>
          <p>Ⅱ</p>
          <p>Ⅲ</p>
          <p>Ⅳ</p>
          <p>Ⅴ</p>
          <p>Ⅵ</p>
          <p>Ⅶ</p>
          <p>Ⅷ</p>
          <p>Ⅸ</p>
          <p>Ⅹ</p>
          <p>Ⅺ</p>
          <p>Ⅻ</p>
          <p>①</p>
          <p>②</p>
          <p>③</p>
          <p>④</p>
          <p>⑤</p>
          <p>⑥</p>
          <p>⑦</p>
          <p>⑧</p>
          <p>⑨</p>
          <p>⑩</p>
          <p>≈</p>
          <p>≡</p>
          <p>≠</p>
          <p>≤</p>
          <p>≥</p>
          <p>≮</p>
          <p>≯</p>
          <p>∷</p>
          <p>⊕</p>
          <p>⊙</p>
          <p>∫</p>
          <p>∮</p>
          <p>∝</p>
          <p>∞</p>
          <p>∧</p>
          <p>∨</p>
          <p>∪</p>
          <p>∩</p>
          <p>∈</p>
          <p>∵</p>
          <p>∴</p>
          <p>⊥</p>
          <p>∥</p>
          <p>∠</p>
          <p>⌒</p>
          <p>≌</p>
          <p>∽</p>
          <p>√</p>
          <p>±</p>
          <p>÷</p>
          <p>×</p>
          <p>＋</p>
          <p>－</p>
        </div>
      </el-tab-pane>
      <el-tab-pane label="希腊字符">
        <div class="chars" @click="clickChars" @dblclick="dblChars">
          <p>Α</p>
          <p>α</p>
          <p>Β</p>
          <p>β</p>
          <p>Γ</p>
          <p>γ</p>
          <p>Δ</p>
          <p>δ</p>
          <p>Ε</p>
          <p>ε</p>
          <p>Ζ</p>
          <p>ζ</p>
          <p>Η</p>
          <p>η</p>
          <p>Θ</p>
          <p>θ</p>
          <p>Ι</p>
          <p>ι</p>
          <p>Κ</p>
          <p>κ</p>
          <p>∧</p>
          <p>λ</p>
          <p>Μ</p>
          <p>μ</p>
          <p>Ν</p>
          <p>ν</p>
          <p>Ξ</p>
          <p>ξ</p>
          <p>Ο</p>
          <p>ο</p>
          <p>∏</p>
          <p>π</p>
          <p>Ρ</p>
          <p>ρ</p>
          <p>∑</p>
          <p>σ</p>
          <p>Τ</p>
          <p>τ</p>
          <p>Υ</p>
          <p>υ</p>
          <p>Φ</p>
          <p>φ</p>
          <p>Χ</p>
          <p>χ</p>
          <p>Ψ</p>
          <p>ψ</p>
          <p>Ω</p>
          <p>ω</p>
        </div>
      </el-tab-pane>
      <el-tab-pane label="箭头符号">
        <div class="chars" @click="clickChars" @dblclick="dblChars">
          <p>←</p>
          <p>↑</p>
          <p>→</p>
          <p>↓</p>
          <p>↔</p>
          <p>↕</p>
          <p>↖</p>
          <p>↗</p>
          <p>↘</p>
          <p>↙</p>
          <p>↚</p>
          <p>↛</p>
          <p>↜</p>
          <p>↝</p>
          <p>↞</p>
          <p>↟</p>
          <p>↠</p>
          <p>↡</p>
          <p>↢</p>
          <p>↣</p>
          <p>↤</p>
          <p>↥</p>
          <p>↦</p>
          <p>↧</p>
          <p>↨</p>
          <p>↩</p>
          <p>↪</p>
          <p>↫</p>
          <p>↬</p>
          <p>↭</p>
          <p>↮</p>
          <p>↯</p>
          <p>↰</p>
          <p>↱</p>
          <p>↲</p>
          <p>↳</p>
          <p>↴</p>
          <p>↵</p>
          <p>↶</p>
          <p>↷</p>
          <p>↸</p>
          <p>↹</p>
          <p>↺</p>
          <p>↻</p>
          <p>↼</p>
          <p>↽</p>
          <p>↾</p>
          <p>↿</p>
          <p>⇀</p>
          <p>⇁</p>
          <p>⇂</p>
          <p>⇃</p>
          <p>⇄</p>
          <p>⇅</p>
          <p>⇆</p>
          <p>⇇</p>
          <p>⇈</p>
          <p>⇉</p>
          <p>⇊</p>
          <p>⇋</p>
          <p>⇌</p>
          <p>⇍</p>
          <p>⇎</p>
          <p>⇏</p>
          <p>⇐</p>
          <p>⇑</p>
          <p>⇒</p>
          <p>⇓</p>
          <p>⇔</p>
          <p>⇖</p>
          <p>⇗</p>
          <p>⇘</p>
          <p>⇙</p>
          <p>⇜</p>
          <p>⇞</p>
          <p>⇟</p>
          <p>⇠</p>
          <p>⇡</p>
          <p>⇢</p>
          <p>⇣</p>
          <p>⇤</p>
          <p>⇥</p>
          <p>⇦</p>
          <p>⇧</p>
          <p>⇨</p>
          <p>⇩</p>
          <p>⇪</p>
          <p>▶</p>
          <p>➔</p>
          <p>➘</p>
          <p>➙</p>
          <p>➚</p>
          <p>➛</p>
          <p>➜</p>
          <p>➝</p>
          <p>➞</p>
          <p>➟</p>
          <p>➠</p>
          <p>➡</p>
          <p>➢</p>
          <p>➣</p>
          <p>➤</p>
          <p>➥</p>
          <p>➦</p>
          <p>➧</p>
          <p>➨</p>
          <p>➩</p>
          <p>➪</p>
          <p>➫</p>
          <p>➬</p>
          <p>➭</p>
          <p>➮</p>
          <p>➯</p>
          <p>➱</p>
          <p>➲</p>
          <p>➳</p>
          <p>➴</p>
          <p>➵</p>
          <p>➶</p>
          <p>➷</p>
          <p>➸</p>
          <p>➹</p>
          <p>➺</p>
          <p>➻</p>
          <p>➼</p>
          <p>➽</p>
          <p>➾</p>
        </div>
      </el-tab-pane>
      <el-tab-pane label="图案字符">
        <div class="chars" @click="clickChars" @dblclick="dblChars">
          <p>¤</p>
          <p>«</p>
          <p>º</p>
          <p>»</p>
          <p>Θ</p>
          <p>Ю</p>
          <p>۰</p>
          <p>ღ</p>
          <p>•</p>
          <p>‿</p>
          <p>₪</p>
          <p>™</p>
          <p>⊕</p>
          <p>⊙</p>
          <p>⊿</p>
          <p>①</p>
          <p>ⓔ</p>
          <p>ⓛ</p>
          <p>ⓞ</p>
          <p>┱</p>
          <p>┲</p>
          <p>╬</p>
          <p>▀</p>
          <p>▄</p>
          <p>█</p>
          <p>▌</p>
          <p>▐</p>
          <p>░</p>
          <p>▒</p>
          <p>■</p>
          <p>▣</p>
          <p>▤</p>
          <p>▥</p>
          <p>▦</p>
          <p>▧</p>
          <p>▨</p>
          <p>▩</p>
          <p>▪</p>
          <p>▫</p>
          <p>▬</p>
          <p>▲</p>
          <p>△</p>
          <p>▶</p>
          <p>▷</p>
          <p>►</p>
          <p>▼</p>
          <p>▽</p>
          <p>◀</p>
          <p>◁</p>
          <p>◄</p>
          <p>◆</p>
          <p>◇</p>
          <p>◈</p>
          <p>◊</p>
          <p>○</p>
          <p>◎</p>
          <p>●</p>
          <p>◐</p>
          <p>◑</p>
          <p>◕</p>
          <p>◘</p>
          <p>◙</p>
          <p>◢</p>
          <p>◣</p>
          <p>◤</p>
          <p>◥</p>
          <p>◦</p>
          <p>☀</p>
          <p>☁</p>
          <p>☂</p>
          <p>☃</p>
          <p>☄</p>
          <p>★</p>
          <p>☆</p>
          <p>☇</p>
          <p>☈</p>
          <p>☊</p>
          <p>☋</p>
          <p>☌</p>
          <p>☍</p>
          <p>☎</p>
          <p>☏</p>
          <p>☐</p>
          <p>☑</p>
          <p>☒</p>
          <p>☚</p>
          <p>☛</p>
          <p>☜</p>
          <p>☝</p>
          <p>☞</p>
          <p>☟</p>
          <p>☠</p>
          <p>☢</p>
          <p>☣</p>
          <p>☪</p>
          <p>☭</p>
          <p>☯</p>
          <p>☰</p>
          <p>☱</p>
          <p>☲</p>
          <p>☳</p>
          <p>☴</p>
          <p>☵</p>
          <p>☶</p>
          <p>☷</p>
          <p>☺</p>
          <p>☻</p>
          <p>☼</p>
          <p>☽</p>
          <p>☾</p>
          <p>♀</p>
          <p>♂</p>
          <p>♈</p>
          <p>♔</p>
          <p>♕</p>
          <p>♖</p>
          <p>♗</p>
          <p>♘</p>
          <p>♙</p>
          <p>♚</p>
          <p>♛</p>
          <p>♜</p>
          <p>♝</p>
          <p>♞</p>
          <p>♟</p>
          <p>♠</p>
          <p>♡</p>
          <p>♢</p>
          <p>♣</p>
          <p>♤</p>
          <p>♥</p>
          <p>♦</p>
          <p>♧</p>
          <p>♨</p>
          <p>♩</p>
          <p>♪</p>
          <p>♫</p>
          <p>♬</p>
          <p>♭</p>
          <p>♮</p>
          <p>♯</p>
          <p>✁</p>
          <p>✂</p>
          <p>✃</p>
          <p>✄</p>
          <p>✆</p>
          <p>✈</p>
          <p>✉</p>
          <p>✌</p>
          <p>✍</p>
          <p>✎</p>
          <p>✏</p>
          <p>✐</p>
          <p>✑</p>
          <p>✒</p>
          <p>✓</p>
          <p>✔</p>
          <p>✕</p>
          <p>✖</p>
          <p>✗</p>
          <p>✘</p>
          <p>✙</p>
          <p>✚</p>
          <p>✡</p>

          <!-- <p>10^12/L</p>
                    <p>10^9/L</p>
                    <p>KIU/L</p>
                    <p>R/s</p>
                    <p>U/L</p>
                    <p>U/ml</p>
                    <p>g</p>
                    <p>g/L</p>
                    <p>kPa</p>
                    <p>mIU/L</p>
                    <p>mg</p>
                    <p>mg/L</p>
                    <p>mg/dl</p>
                    <p>ml</p>
                    <p>ml/s</p>
                    <p>mmHg</p>
                    <p>mmol/L</p>
                    <p>mol/24h</p>
                    <p>mol/L</p>
                    <p>nmol/L</p>
                    <p>pmol/L</p> -->
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  props: {
    comInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      time: null
    }
  },
  methods: {
    dblChars(e) {
      // clearTimeout(this.time);
      // if (e.target.nodeName == "P") {
      //     this.selectChar(e.target);
      //     this.$emit("dialogConfirm", "add");
      // }
    },
    clickChars(e) {
      clearTimeout(this.time)
      if (e.target.nodeName == 'P') {
        this.time = setTimeout(() => {
          this.selectChar(e.target)
        }, 150)
      }
    },
    selectChar(target) {
      document.querySelectorAll('.chars p').forEach(node => {
        node.className = ''
      })
      target.className = 'active'
      this.comInfo.char = target.innerHTML
    },
    getChars() {
      if (this.comInfo.char) {
        return this.comInfo.char
      } else {
        this.$message.warning('请选择字符')
        return ''
      }
    }
  }
}
</script>
<style lang="scss">
.specialChars {
  .chars {
    display: flex;
    flex-wrap: wrap;
    // height: 5px;
    overflow-y: auto;
    p {
      flex-shrink: 0;
      width: 35px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      font-size: 16px;
      margin-right: 3px;
      cursor: pointer;
      border: 2px solid #fff;
      box-sizing: border-box;
      &:hover {
        font-size: 28px;
        border: 2px solid #1890ff;
      }
    }
    .active {
      font-size: 28px;
      border: 2px solid #1890ff;
    }
  }
}
</style>
