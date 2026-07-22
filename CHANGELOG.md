# Change Log

## [Unreleased]

## [0.1.0] - 2026-07-22

### Added
- `Logger` クラスの `window()` メソッドを Unicode 対応

### Fixed
- `[BAR]` の表示が崩れる問題を修正
- `Logger` クラスの `window()` メソッドの引数を変更したことに伴い、README.md の使用例を修正

### Changed
- `Logger` クラスの `window()` メソッドの引数を変更
- `window(title: string, content: LoggerCreateData[])` に変更


## [0.0.2] - 2026-07-17

### Added
- `Ask` クラスの追加

### Fixed
- `[BAR]` の表示が崩れる問題を修正

## 0.0.1 - 2026-06-19
### Added
- `[INFO]`
- `[SYSTEM]`
- `[MESSAGE]`
- `[ERROR]`
- `[WARN]`
- `[PROCESS]`
- `[SUCCESS]`

[Unreleased]: https://github.com/donneko/tyoi-logger/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/donneko/tyoi-logger/compare/v0.0.2...v0.1.0
[0.0.2]: https://github.com/donneko/tyoi-logger/compare/v0.0.1...v0.0.2