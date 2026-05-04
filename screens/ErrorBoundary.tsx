import React,{ Component,ErrorInfo,ReactNode } from 'react';
import { StyleSheet,Text,TouchableOpacity,View } from 'react-native';

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

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error,errorInfo: ErrorInfo) {
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
                <View style={styles.container}>
                    <Text style={styles.title}>{"Something went wrong."}</Text>
                    <Text style={styles.subtitle}>{"Unexpected errors happened and prevented the application from running."}</Text>
                    <TouchableOpacity style={styles.button} onPress={this.handleReset}>
                        <Text style={styles.buttonText}>Try Again</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return this.props.children;
    }
}

const styles = StyleSheet.create({
    container: { flex: 1,justifyContent: 'center',alignItems: 'center',padding: 20,backgroundColor: '#fff' },
    title: { fontSize: 22,fontWeight: 'bold',color: '#ff4444' },
    subtitle: { fontSize: 16,color: '#666',textAlign: 'center',marginVertical: 10 },
    button: { backgroundColor: '#ff9900',padding: 12,borderRadius: 8,marginTop: 20 },
    buttonText: { color: '#fff',fontWeight: 'bold' }
});

export default ErrorBoundary;