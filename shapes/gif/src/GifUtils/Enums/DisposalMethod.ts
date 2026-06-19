export enum DisposalMethod {
  /**
   * unspecified &gt; replaces entire frame
   */
  Replace,

  /**
   * do not dispose &gt; combine with previous frame
   */
  Combine,

  /**
   * restore to background &gt; combine with first frame (background)
   */
  RestoreBackground,

  /**
   * restore to previous &gt; restore to previous undisposed frame state then combine
   */
  RestorePrevious,

  /**
   * undefined &gt; fallback to `Replace`
   */
  UndefinedA,

  /**
   * undefined &gt; fallback to `Replace`
   */
  UndefinedB,

  /**
   * undefined &gt; fallback to `Replace`
   */
  UndefinedC,

  /**
   * undefined &gt; fallback to `Replace`
   */
  UndefinedD,
}
