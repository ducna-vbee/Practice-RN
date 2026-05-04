import React,{ Component,ErrorInfo,ReactNode } from 'react';
import { Text,TouchableOpacity,View } from 'react-native';

interface Props
{
    children: ReactNode;
}

interface State
{
    hasError: boolean;
}

class ErrorBoundary extends Component<Props,State>
{
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(_: Error): State
    {
        return { hasError: true };
    }

    public componentDidCatch(error: Error,errorInfo: ErrorInfo)
    {
        console.error("Uncaught error:",error,errorInfo);
    }

    private handleReset = () => {
        this.setState({ hasError: false });
    };

    public render()
    {
        if (this.state.hasError === true)
        {
            return (
                <View 
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 20,
                        backgroundColor: '#fff',
                    }}
                >
                    <Text
                        style={{
                            fontSize: 22,
                            fontWeight: 'bold',
                            color: '#ff4444',
                        }}
                    >{"Something went wrong."}</Text>
                    <Text
                        style={{
                            fontSize: 16,
                            color: '#666',
                            textAlign: 'center',
                            marginVertical: 10,
                        }}
                    >{"Unexpected errors happened and prevented the application from running."}</Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#ff9900',
                            padding: 12,
                            borderRadius: 8,
                            marginTop: 20,
                        }}
                        onPress={this.handleReset}
                    >
                        <Text
                            style={{
                                color: '#fff',
                                fontWeight: 'bold',
                            }}
                        >Try Again</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return this.props.children;
    }
};

export default ErrorBoundary;