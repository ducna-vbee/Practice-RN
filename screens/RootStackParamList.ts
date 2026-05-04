type RootStackParamList = {
    ListView: { category?: string };
    ImageView: undefined;
    SectionView: undefined;
    ReferenceView: undefined;
    FlexibleView: undefined;
    NumberView: {content: number};
    ImmutableCounterView: undefined;
    MutableContextView: undefined;
    Settings: undefined;
};

export default RootStackParamList;