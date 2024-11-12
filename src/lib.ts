// 复制到剪切板
export function copyText(str: string) {
  if (str.trim().length === 0) {
    alert('请先输入要转换的文本')
    return
  }
  navigator.clipboard
    .writeText(str)
    .then(() => {
      alert('复制成功')
    })
    .catch(err => {
      alert('复制失败')
      console.log('复制失败', err)
    })
}

// 转换函数
export function convertRuby(str: string): string {
  const context = new Context()
  for (const char of str) {
    context.handleChar(char)
  }
  context.checkTagClosure()
  return context.getResult()
}

// 状态接口
interface State {
  handleChar(char: string, context: Context): void
}

// 具体状态类
class NoneState implements State {
  handleChar(char: string, context: Context) {
    if (char === '\\') {
      context.pushState(new EscCharState())
    } else if (char === '|') {
      context.pushState(new BaseTextState())
      context.appendResult('<ruby>')
    } else {
      context.appendResult(char)
    }
  }
}

class BaseTextState implements State {
  handleChar(char: string, context: Context) {
    if (char === '\\') {
      context.pushState(new EscCharState())
    } else if (char === '|') {
      context.popState()
      context.appendResult('</ruby>')
    } else if (char === '^') {
      context.pushState(new RubyTextState())
      context.appendResult('<rt>')
    } else {
      context.appendResult(char)
    }
  }
}

class RubyTextState implements State {
  handleChar(char: string, context: Context) {
    if (char === '\\') {
      context.pushState(new EscCharState())
    } else if (char === '|') {
      context.popState()
      context.appendResult('</rt>')
      context.popState()
      context.appendResult('</ruby>')
    } else {
      context.appendResult(char)
    }
  }
}

class EscCharState implements State {
  handleChar(char: string, context: Context) {
    context.popState()
    context.appendResult(char)
  }
}

// 上下文类
class Context {
  private stateStack: State[] = [new NoneState()]
  private result: string = ''

  pushState(state: State) {
    this.stateStack.push(state)
  }

  popState() {
    this.stateStack.pop()
  }

  appendResult(str: string) {
    this.result += str
  }

  handleChar(char: string) {
    this.stateStack[this.stateStack.length - 1].handleChar(char, this)
  }

  checkTagClosure() {
    let flag = false
    for (let item = this.stateStack.pop(); item; item = this.stateStack.pop()) {
      if (item instanceof BaseTextState) {
        this.appendResult('</ruby>')
        flag = true
      } else if (item instanceof RubyTextState) {
        this.appendResult('</rt>')
        flag = true
      } else if (item instanceof EscCharState) {
        flag = true
      }
    }
    if (flag) {
      this.appendResult(
        '<br><p style="color: grey; font-style: italic;">❕检测到未闭合的标签，请检查格式。</p>',
      )
    }
  }

  getResult(): string {
    return this.result
  }
}
